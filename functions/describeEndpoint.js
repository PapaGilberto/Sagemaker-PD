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
  const endpointName = body.endpointName;

  // Function to check the status of the endpoint
  const checkEndpointStatus = async (endpointName) => {
    try {
      const data = await sagemaker
        .describeEndpoint({ EndpointName: endpointName })
        .promise();
      console.log(`Endpoint Status: ${data.EndpointStatus}`);
      return data.EndpointStatus;
    } catch (error) {
      console.error("Error fetching endpoint status:", error);
      throw error;
    }
  };

  // Call the function
  checkEndpointStatus(endpointName)
    .then((status) => {
      if (status === "InService") {
        console.log("Endpoint is in service and ready to use.");
      } else if (status === "Creating") {
        console.log("Endpoint is currently being created.");
      } else if (status === "Failed") {
        console.log("Endpoint creation failed. Check the failure reason.");
      }
      // Add more conditions based on your needs
    })
    .catch((error) => console.error(error));
}
