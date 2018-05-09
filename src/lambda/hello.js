import fetch from "node-fetch"; // equivalent to const fetch = require("node-fetch").default;

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log({ identity, user });
  const userID = user.sub;
  const usersUrl = `${identity.url}/admin/users`;

  var adminAuthHeader = "Bearer " + identity.token;
  try {
    return fetch(usersUrl, {
      method: "POST",
      headers: { Authorization: adminAuthHeader },
      body: JSON.stringify({ email: "luna+05@netlify.com", password: "gotrue" })
    })
      .then(response => {
        console.log("Created a user! 204!");
        console.log({ response });
        return { statusCode: 204 };
      })
      .catch(e => {
        console.log("Failed to create a user! 500! Internal.");
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
