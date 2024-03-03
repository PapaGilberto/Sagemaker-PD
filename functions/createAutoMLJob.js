const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const sagemaker = new AWS.SageMaker();

// Function to create an AutoML job
function createAutoMLJob(params) {
  return new Promise((resolve, reject) => {
    sagemaker.createAutoMLJob(params, function(err, data) {
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
  const { jobName, inputFileName, targetAttributeName } = body;
  const params = {
    AutoMLJobName: jobName,
    InputDataConfig: [
      {
        DataSource: {
          S3DataSource: {
            S3DataType: 'S3Prefix',
            S3Uri: `https://${process.env.UPLOAD_BUCKET}.s3.amazonaws.com/sagemaker/demo/input/${inputFileName}`
          }
        },
        TargetAttributeName: targetAttributeName
      }
    ],
    OutputDataConfig: {
      S3OutputPath: `s3://${process.env.UPLOAD_BUCKET}/sagemaker/demo/output`
    },
    RoleArn: `${process.env.SAGEMAKER_ROLE_ARN}`,
    // ProblemType: problemType, // 'Regression', 'BinaryClassification', 'MulticlassClassification'
    // AutoMLJobObjective: {
    //   MetricName: 'MeanSquaredError' // Or 'Accuracy', 'MeanSquaredError', 'F1Score', 'AreaUnderROC', etc. depending on the problem type
    // }
  };
  
  createAutoMLJob(params)
    .then(data => {
      console.log('AutoML job created successfully:', data.AutoMLJobArn);
    })
    .catch(err => {
      console.error('Error creating AutoML job:', err);
    });
 
}
