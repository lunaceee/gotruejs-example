import fetch from "node-fetch"; // equivalent to const fetch = require("node-fetch").default;

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log({ identity, user });
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/${userID}`;

  var adminAuthHeader = "Bearer " + identity.token;
  console.log({ authHeader });
  try {
    fetch(userUrl, {
      method: "PUT",
      headers: { Authorization: adminAuthHeader },
      body: JSON.stringify({ app_metadata: { roles: ["admin"] } })
    })
      .then(response => {
        console.log("GOT HERE! 204!");
        console.log({ response });
        return { statusCode: 204 };
      })
      .catch(e => {
        console.log("GOT HERE! 500! Internal.");
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
