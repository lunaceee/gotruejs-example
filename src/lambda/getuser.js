import fetch from "node-fetch";

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log({ identity, user });
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/{${userID}}`;
  const adminAuthHeader = "Bearer " + identity.token;

  try {
    const response = await fetch(userUrl, {
      method: "GET",
      headers: { Authorization: adminAuthHeader }
    });
    const resObj = await response.json();
    console.log("Got a user!");
    console.log(JSON.stringify(resObj));
    return {
      statusCode: 204,
      body: JSON.stringify(resObj)
    };
  } catch (e) {
    console.log("GOT HERE! 500! outer");
    return { statusCode: 500, body: "Internal Server Error: " + e };
  }
};
