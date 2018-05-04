exports.handler = async function(event, context) {
  // your server-side functionality
  console.log({ event, context });
  return {
    statusCode: 200,
    body: "hello!"
  };
};
