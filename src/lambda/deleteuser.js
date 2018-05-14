import fetch from "node-fetch"; // equivalent to const fetch = require("node-fetch").default;

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/{${userID}}`;
  const adminAuthHeader = "Bearer " + identity.token;

  try {
    const response = await fetch(userUrl, {
      method: "DELETE",
      headers: { Authorization: adminAuthHeader }
    });
    const resObj = await response.json();
    console.log("Deleted a user!");
    console.log({ resObj });
    return { statusCode: 204 };
  } catch (e) {
    console.log("GOT HERE! 500! outer");
    return { statusCode: 500, body: "Internal Server Error: " + e };
  }
};
