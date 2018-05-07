exports.handler = async function(event, context) {
  const { identity, user } = context.clientContext;
  const userID = "3cb45f46-380c-44c3-ac53-33ff8696bf12";
  const userUrl =
    "https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity" +
    `admin/users/${userID}`;
  console.log(userUrl);
  return {
    statusCode: 200,
    body: JSON.stringify([event, userUrl, context.clientContext])
  };
};
