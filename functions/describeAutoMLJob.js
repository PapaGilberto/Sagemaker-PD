const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const sagemaker = new AWS.SageMaker();

// Function to describe an AutoML job
function describeAutoMLJob(autoMLJobName) {
  const params = {
    AutoMLJobName: autoMLJobName
  };

  return new Promise((resolve, reject) => {
    sagemaker.describeAutoMLJob(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const autoMLJobName = body.autoMLJobName;

describeAutoMLJob(autoMLJobName)
  .then(data => {
    console.log('AutoML job details:', data);
    console.log(data.BestCandidate.InferenceContainers);
  })
  .catch(err => {
    console.error('Error describing AutoML job:', err);
  });
}
