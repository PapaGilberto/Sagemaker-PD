// Converts our basic request, e.g. "get" into the proper request to the database.
import AWS from "aws-sdk";

export function call(action, params) {
  const s3 = new AWS.S3();
  return s3[action](params).promise();
}
