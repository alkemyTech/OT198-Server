const multer = require('multer')
const fs = require('fs')
const util = require('util')
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const path = require('path')
const { catchAsync } = require('../helpers/catchAsync')
const ApiError = require('../helpers/ApiError')

const unlinkFile = util.promisify(fs.unlink)
const { s3Client } = require('../libs/s3Client')

const BUCKET = process.env.S3_BUCKET_NAME
const REGION = process.env.AWS_REGION

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }
    return cb(undefined, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true })
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      const name = req.body.name || req.body.email
      cb(null, `${name}-${Date.now()}${path.extname(file.originalname)}`)
    },
  }),
})

module.exports = {
  uploadImage: (image) => catchAsync(async (req, res, next) => {
    upload.single(image)(req, res, async (err) => {
      if (err) {
        return next(new ApiError(400, err.message))
      }
      const fileStream = fs.createReadStream(req.file.path)
      const uploadParams = {
        Bucket: BUCKET,
        Body: fileStream,
        Key: req.file.filename,
      }

      await s3Client.send(new PutObjectCommand(uploadParams))

      const fileLocation = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${req.file.filename}`
      req.file.location = fileLocation
      await unlinkFile(req.file.path)

      return next()
    })
  }),
}
