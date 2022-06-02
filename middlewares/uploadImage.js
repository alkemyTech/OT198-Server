const multer = require('multer')
const fs = require('fs')
const util = require('util')
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { catchAsync } = require('../helpers/catchAsync')

const unlinkFile = util.promisify(fs.unlink)
const { s3 } = require('../libs/s3Client')

const BUCKET = process.env.S3_BUCKET_NAME

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  },
})

module.exports = {
  uploadImage: (image) => catchAsync(async (req, res, next) => {
    upload.single(image)(req, res, async (err) => {
      if (err) {
        const httpError = new Error(err.message)
        httpError.statusCode = 400
        return next(httpError)
      }
      const fileStream = fs.createReadStream(req.file.path)
      const uploadParams = {
        Bucket: BUCKET,
        Body: fileStream,
        Key: req.file.filename,
      }

      await s3.send(new PutObjectCommand(uploadParams))

      const fileLocation = `https://${BUCKET}.s3.amazonaws.com/${req.file.filename}`
      req.file.location = fileLocation
      await unlinkFile(req.file.path)

      return next()
    })
  }),
}
