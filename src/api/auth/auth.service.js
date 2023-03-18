const { db } = require("../../database");

const authService = {
  create: async (userObject) => {
    return await db.user.create({
      data: userObject,
    });
  },
};

module.exports = authService;
