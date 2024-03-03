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

// functions/createEndpoint.js
var createEndpoint_exports = {};
__export(createEndpoint_exports, {
  main: () => main
});
module.exports = __toCommonJS(createEndpoint_exports);
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
var sagemaker = new AWS.SageMaker();
async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const modelName = body.modelName;
  const endpointConfigName = `${modelName}-endpoint-config-3`;
  const endpointName = `${modelName}-endpoint-3`;
  const createEndpointConfigParams = {
    EndpointConfigName: endpointConfigName,
    ProductionVariants: [
      {
        ModelName: modelName,
        VariantName: "AllTraffic",
        InstanceType: "ml.m5.large",
        // Specify the instance type
        InitialInstanceCount: 1
        // Specify the initial number of instances
        // ServerlessConfig: {
        //   // Specify this for serverless inference
        //   MemorySizeInMB: 4096, // Specify memory size, for example, 2048MB
        //   MaxConcurrency: 50, // Specify the maximum concurrency
        // },
      }
    ]
  };
  sagemaker.createEndpointConfig(
    createEndpointConfigParams,
    function(err, data) {
      if (err)
        console.log(err, err.stack);
      else {
        console.log("Endpoint Configuration Created:", data);
        const createEndpointParams = {
          EndpointName: endpointName,
          EndpointConfigName: endpointConfigName
        };
        sagemaker.createEndpoint(createEndpointParams, function(err2, data2) {
          if (err2)
            console.log(err2, err2.stack);
          else
            console.log("Endpoint Created:", data2);
        });
      }
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
