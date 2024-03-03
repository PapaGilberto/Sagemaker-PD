var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// functions/createAutoMLJob.js
var createAutoMLJob_exports = {};
__export(createAutoMLJob_exports, {
  main: () => main
});
module.exports = __toCommonJS(createAutoMLJob_exports);
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
var sagemaker = new AWS.SageMaker();
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
async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const { jobName, inputFileName, targetAttributeName } = body;
  const params = {
    AutoMLJobName: jobName,
    InputDataConfig: [
      {
        DataSource: {
          S3DataSource: {
            S3DataType: "S3Prefix",
            S3Uri: `https://${process.env.UPLOAD_BUCKET}.s3.amazonaws.com/sagemaker/demo/input/${inputFileName}`
          }
        },
        TargetAttributeName: targetAttributeName
      }
    ],
    OutputDataConfig: {
      S3OutputPath: `s3://${process.env.UPLOAD_BUCKET}/sagemaker/demo/output`
    },
    RoleArn: `${process.env.SAGEMAKER_ROLE_ARN}`
    // ProblemType: problemType, // 'Regression', 'BinaryClassification', 'MulticlassClassification'
    // AutoMLJobObjective: {
    //   MetricName: 'MeanSquaredError' // Or 'Accuracy', 'MeanSquaredError', 'F1Score', 'AreaUnderROC', etc. depending on the problem type
    // }
  };
  createAutoMLJob(params).then((data) => {
    console.log("AutoML job created successfully:", data.AutoMLJobArn);
  }).catch((err) => {
    console.error("Error creating AutoML job:", err);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
