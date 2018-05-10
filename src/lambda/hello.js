import fetch from "node-fetch"; // equivalent to const fetch = require("node-fetch").default;

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log({ identity, user });
  const aud = identity.token.split(".")[1];
  console.log({ aud });
  const userID = user.sub;
  const usersUrl = `${identity.url}/admin/users?audience=smashing`;
  const adminAuthHeader = "Bearer " + identity.token;

  try {
    return fetch(usersUrl, {
      method: "GET",
      headers: { Authorization: adminAuthHeader, "X-JWT-AUD": "smashing" }
    })
      .then(response => {
        console.log("Got a list of users! 204!");
        console.log({ response });
        return { statusCode: 204 };
      })
      .catch(e => {
        console.log("Failed to get a list of users! 500! Internal.");
        return {
          statusCode: 500,
          body: "Internal Server Error: " + e
        };
      });
  } catch (e) {
    console.log("GOT HERE! 500! outer");
    return { statusCode: 500, body: "Internal Server Error: " + e };
  }
};
