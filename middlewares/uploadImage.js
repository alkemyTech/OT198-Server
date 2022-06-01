const path = require('path')

const multer = require('multer')
const multerS3 = require('multer-s3')
const { s3Client } = require('../libs/s3Client')

const BUCKET = process.env.S3_BUCKET_NAME

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: s3Client,
      bucket: BUCKET,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },
      key(req, file, cb) {
        const name = req.body.name || req.body.email
        cb(null, `${name}-${Date.now().toString()}${path.extname(file.originalname)}`)
      },
    }),
    /* filtra los tipos de archivos que se pueden subir */
    fileFilter: (req, file, cb) => {
      cb(null, file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif')
    },
  }),
}
