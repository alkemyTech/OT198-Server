const { /* CreateBucketCommand */PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')
const { s3Client } = require('../libs/s3Client')

const file = path.join(__dirname, '../public/img/LOGO-SOMOS MAS.png')// Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file)

// Set the parameters
const uploadParams = {
  Bucket: process.env.S3_BUCKET_NAME,
  // Add the required 'Key' parameter using the 'path' module.
  Key: file,
  // Add the required 'Body' parameter
  Body: fileStream,
}

module.exports = async () => {
  try {
    /* const data = await s3Client.send(new CreateBucketCommand(bucketParams)) */
    const data = await s3Client.send(new PutObjectCommand(uploadParams))
    return data
  } catch (error) {
    throw new Error(error)
  }
}
