// const fetch = require("node-fetch").default;
import fetch from "node-fetch";

exports.handler = function(event, context, callback) {
  const { identity, user } = context.clientContext;
  const userID = "3cb45f46-380c-44c3-ac53-33ff8696bf12";
  const userUrl = `https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity/admin/users/${userID}`;
  try {
    fetch(userUrl, { email: "luna+new@netlify.com", password: "gotrue" })
      .then(response => {
        console.log("GOT HERE! 204!");
        const newMeta = response.app_metadata;
        console.log({ newMeta });
        callback(null, { statusCode: 204 });
      })
      .catch(e => {
        console.log("GOT HERE! 500! Internal.");
        callback(null, {
          statusCode: 500,
          body: "Internal Server Error: " + e
        });
      });
  } catch (e) {
    console.log("GOT HERE! 500! outer");
    callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
  }
};
