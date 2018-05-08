import fetch from "node-fetch"; // equivalent to const fetch = require("node-fetch").default;

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log({ identity, user });
  const userID = user.sub;
  const userUrl = `https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity/admin/users/${userID}`;

  try {
    fetch(userUrl, {
      method: "GET"
      // body: JSON.stringify({ app_metadata: { roles: ["admin"] } })
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
