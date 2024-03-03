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

// functions/createModel.js
var createModel_exports = {};
__export(createModel_exports, {
  main: () => main
});
module.exports = __toCommonJS(createModel_exports);
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
var sagemaker = new AWS.SageMaker();
async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const { modelName, image, modelDataUrl } = body;
  const createModelParams = {
    ExecutionRoleArn: process.env.SAGEMAKER_ROLE_ARN,
    ModelName: modelName,
    PrimaryContainer: {
      Image: image,
      // Get this from your AutoML job's best candidate
      ModelDataUrl: modelDataUrl
      // And this
    }
  };
  sagemaker.createModel(createModelParams, function(err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log(data);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
