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

// functions/describeEndpoint.js
var describeEndpoint_exports = {};
__export(describeEndpoint_exports, {
  main: () => main
});
module.exports = __toCommonJS(describeEndpoint_exports);
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
var sagemaker = new AWS.SageMaker();
async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const endpointName = body.endpointName;
  const checkEndpointStatus = async (endpointName2) => {
    try {
      const data = await sagemaker.describeEndpoint({ EndpointName: endpointName2 }).promise();
      console.log(`Endpoint Status: ${data.EndpointStatus}`);
      return data.EndpointStatus;
    } catch (error) {
      console.error("Error fetching endpoint status:", error);
      throw error;
    }
  };
  checkEndpointStatus(endpointName).then((status) => {
    if (status === "InService") {
      console.log("Endpoint is in service and ready to use.");
    } else if (status === "Creating") {
      console.log("Endpoint is currently being created.");
    } else if (status === "Failed") {
      console.log("Endpoint creation failed. Check the failure reason.");
    }
  }).catch((error) => console.error(error));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
