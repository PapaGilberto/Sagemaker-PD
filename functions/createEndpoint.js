const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sagemaker = new AWS.SageMaker();

export async function main(event, context, callback) {
  // Specify your model name and the endpoint configuration
  const body = JSON.parse(event.body);
  const modelName = body.modelName;
  const endpointConfigName = `${modelName}-endpoint-config-3`;
  const endpointName = `${modelName}-endpoint-3`;

  // Create an endpoint configuration with ServerlessConfig
  const createEndpointConfigParams = {
    EndpointConfigName: endpointConfigName,
    ProductionVariants: [
      {
        ModelName: modelName,
        VariantName: "AllTraffic",
        InstanceType: "ml.m5.large", // Specify the instance type
        InitialInstanceCount: 1, // Specify the initial number of instances
        // ServerlessConfig: {
        //   // Specify this for serverless inference
        //   MemorySizeInMB: 4096, // Specify memory size, for example, 2048MB
        //   MaxConcurrency: 50, // Specify the maximum concurrency
        // },
      },
    ],
  };

  sagemaker.createEndpointConfig(
    createEndpointConfigParams,
    function (err, data) {
      if (err) console.log(err, err.stack); // An error occurred
      else {
        console.log("Endpoint Configuration Created:", data); // Successful response

        // Create an endpoint using the configuration
        const createEndpointParams = {
          EndpointName: endpointName,
          EndpointConfigName: endpointConfigName,
        };

        sagemaker.createEndpoint(createEndpointParams, function (err, data) {
          if (err) console.log(err, err.stack); // An error occurred
          else console.log("Endpoint Created:", data); // Successful response
        });
      }
    }
  );
}
