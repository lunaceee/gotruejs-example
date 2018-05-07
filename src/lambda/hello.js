exports.handler = async function(event, context) {
  const { identity, user, url } = context.clientContext;
  const userID = "3cb45f46-380c-44c3-ac53-33ff8696bf12";
  const userUrl = url + `admin/users/${userID}`;
  console.log(userUrl);
  return {
    statusCode: 200,
    body: JSON.stringify([event, context.clientContext])
  };
};
