const userProps = ["id", "name", "email", "role", "createdAt", "updatedAt"];

exports.userInfoDao = (user) => {
  const result = {};
  for (const userProp of userProps) {
    result[userProp] = user[userProp];
  }
  return result;
};
