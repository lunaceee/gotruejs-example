// const fetch = require("node-fetch").default;
import fetch from "node-fetch";

exports.handler = function(event, context, callback) {
  try {
    const { identity, user } = context.clientContext;
    const userID = user.sub;
    const userUrl = `https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity/admin/users/${userID}`;
    const payload = JSON.parse(event.body);
    console.log({ payload });
    fetch(userUrl)
      .then(response => {
        console.log("GOT HERE! 204!");
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
