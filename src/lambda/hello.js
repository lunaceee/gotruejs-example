import fetch from "node-fetch"; // equivalent to const fetch = require("node-fetch").default;

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/{${userID}}`;
  const adminAuthHeader = "Bearer " + identity.token;

  try {
    return fetch(userUrl, {
      method: "DELETE",
      headers: { Authorization: adminAuthHeader }
    })
      .then(response => {
        console.log("Deleted a user!");
        return response.json();
      })
      .then(data => {
        console.log({ data });
        return { statusCode: 204 };
      })
      .catch(e => {
        console.log("Failed to delete a user! 500! Internal.");
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
