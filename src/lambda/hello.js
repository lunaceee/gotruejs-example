import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://kaldi-identity-access-test.netlify.com/.netlify/identity"
});

exports.handler = async function(event, context) {
  // your server-side functionality

  return {
    statusCode: 200,
    body: { event, context }
  };
};
