const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Function to upload CSV file to S3 bucket
function uploadFileToS3(filePath, bucketName, keyName) {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: `${bucketName}/sagemaker/demo/input`,
    Key: keyName,
    Body: fileStream
  };

  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function main(event, context, callback) {
  const body = JSON.parse(event.body)
  const filePath = body.filePath;
  const bucketName = process.env.UPLOAD_BUCKET;
  const keyName = filePath.split('/').pop();

  uploadFileToS3(filePath, bucketName, keyName)
    .then(data => {
      console.log(`File uploaded successfully. Location: ${data.Location}`);
    })
    .catch(err => {
      console.error('Error uploading file:', err);
    });
}
