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

// uploadFile.js
var uploadFile_exports = {};
__export(uploadFile_exports, {
  main: () => main
});
module.exports = __toCommonJS(uploadFile_exports);
var fs = require("fs");
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
var s3 = new AWS.S3();
function uploadFileToS3(filePath, bucketName, keyName) {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: `${bucketName}/sagemaker/demo`,
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
async function main(event, context, callback) {
  console.log(event.body);
  const body = JSON.parse(event.body);
  const filePath = body.filePath;
  const bucketName = process.env.UPLOAD_BUCKET;
  const keyName = filePath.split("/").pop();
  uploadFileToS3(filePath, bucketName, keyName).then((data) => {
    console.log(`File uploaded successfully. Location: ${data.Location}`);
  }).catch((err) => {
    console.error("Error uploading file:", err);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
