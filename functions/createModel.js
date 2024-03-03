const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sagemaker = new AWS.SageMaker();

export async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const { modelName, image, modelDataUrl } = body;
  
  const createModelParams = {
    ExecutionRoleArn: process.env.SAGEMAKER_ROLE_ARN,
    ModelName: modelName,
    PrimaryContainer: {
        Image: image, 
        ModelDataUrl: modelDataUrl, 
    },
};

sagemaker.createModel(createModelParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
});
}
