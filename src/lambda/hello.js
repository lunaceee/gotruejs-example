const fetch = require("node-fetch");

exports.handler = function(event, context, callback) {
  const { identity, user } = context.clientContext;
  try {
    fetch(userURL)
      .then(() => {
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
