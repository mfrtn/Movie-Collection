const { db } = require("../../database");

const movieService = {
  findMany: async () => {
    return await db.movie.findMany({
      orderBy: {
        id: "asc",
      },
    });
  },

  findById: async (id) => {
    return await db.movie.findUnique({
      where: {
        id,
      },
    });
  },

  create: async (movieObject) => {
    return await db.movie.create({
      data: movieObject,
    });
  },
};

module.exports = movieService;
