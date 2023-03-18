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

  update: async (id, collectionObject) => {
    return await db.collection.update({
      where: {
        id,
      },
      data: {
        title: collectionObject.title,
      },
    });
  },

  destroy: async (id) => {
    return await db.collection.delete({
      where: {
        id,
      },
    });
  },

  newRate: async (collectionRateObject) => {
    return await db.collectionRates.create({
      data: collectionRateObject,
    });
  },

  updateRate: async (collectionRateObject) => {
    console.log(collectionRateObject);
    return await db.collectionRates.update({
      where: {
        collectionId_userId: {
          collectionId: collectionRateObject.collectionId,
          userId: collectionRateObject.userId,
        },
      },
      data: {
        rate: collectionRateObject.rate,
      },
    });
  },

  findCollectionRate: async (collectionId, userId) => {
    return await db.collectionRates.findUnique({
      where: {
        collectionId_userId: {
          collectionId,
          userId,
        },
      },
    });
  },

  findAllRateOfACollection: async (id) => {
    return [
      await db.collection.findUnique({
        where: {
          id,
        },
        include: {
          rates: {
            select: {
              rate: true,
            },
          },
        },
      }),
      await db.collectionRates.aggregate({
        where: {
          collectionId: id,
        },
        _avg: {
          rate: true,
        },
      }),
      await db.collectionRates.aggregate({
        where: {
          collectionId: id,
        },
        _count: {
          rate: true,
        },
      }),
    ];
  },
};

module.exports = collectionService;
