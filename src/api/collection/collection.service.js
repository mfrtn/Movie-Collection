const { db } = require("../../database");

const collectionService = {
  findMany: async () => {
    return await db.collection.findMany({
      orderBy: {
        id: "asc",
      },
    });
  },

  findById: async (id) => {
    return await db.collection.findUnique({
      where: {
        id,
      },
      include: {
        movies: {
          select: {
            movie: {},
          },
        },
      },
    });
  },

  create: async (collectionObject) => {
    return await db.collection.create({
      data: collectionObject,
    });
  },

  isMovieBelongsToCollection: async (collectionId, movieId) => {
    return await db.moviesOnCollections.findUnique({
      where: {
        movieId_collectionId: {
          movieId,
          collectionId,
        },
      },
    });
  },

  addMovieToCollection: async (collectionId, movieId) => {
    return await db.moviesOnCollections.create({
      data: {
        collectionId,
        movieId,
      },
    });
  },

  removeMovieFromCollection: async (collectionId, movieId) => {
    return await db.moviesOnCollections.delete({
      where: {
        movieId_collectionId: {
          movieId,
          collectionId,
        },
      },
    });
  },
};

module.exports = collectionService;
