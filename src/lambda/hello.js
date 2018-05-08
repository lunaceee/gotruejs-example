// const fetch = require("node-fetch").default;
import fetch from "node-fetch";

exports.handler = function(event, context, callback) {
  const { identity, user } = context.clientContext;
  console.log({ identity, user });
  const userID = user.sub;
  const userUrl = `https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity/admin/users/${userID}`;
  console.log(userID);
  // try {
  //   fetch(userUrl, { email: "luna+new@netlify.com", password: "gotrue" })
  //     .then(response => {
  //       console.log("GOT HERE! 204!");
  //       const newMeta = response.app_metadata;
  //       console.log({ response });
  //       callback(null, { statusCode: 204 });
  //     })
  //     .catch(e => {
  //       console.log("GOT HERE! 500! Internal.");
  //       callback(null, {
  //         statusCode: 500,
  //         body: "Internal Server Error: " + e
  //       });
  //     });
  // } catch (e) {
  //   console.log("GOT HERE! 500! outer");
  //   callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
  // }
};
