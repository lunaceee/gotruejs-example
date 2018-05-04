import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://kaldi-identity-access-test.netlify.com/.netlify/identity"
});

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ event } + { context })
  };
};
