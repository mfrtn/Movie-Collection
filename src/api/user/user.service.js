const { db } = require("../../database");
const { userInfoDao } = require("./user.dao");

const userService = {
  findMany: async () => {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return users;
  },

  findById: async (id) => {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return userInfoDao(user);
    } else {
      return user;
    }
  },

  findByEmail: async (email) => {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  },
};

module.exports = userService;
