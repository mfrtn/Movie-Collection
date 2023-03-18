const collectionService = require("./collection.service");
const { movieService } = require("../movie");

const collectionController = {
  index: async (req, res, next) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const collections = await collectionService.findMany();
        return res.json(collections).end();
      } else if (!isNaN(id)) {
        const collection = await collectionService.findById(parseInt(id));
        if (collection) {
          return res.json(collection).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  },

  create: async (req, res, next) => {
    // Should Validate Body Request
    collectionObject = req.body;
    try {
      collectionObject.userId = req.user.id;
      newObj = await collectionService.create(collectionObject);
      return res.json(newObj).end();
    } catch (error) {
      return next(error);
    }
  },

  addMovies: async (req, res, next) => {
    const result = {};
    collectionId = req.params.id;
    try {
      if (collectionId !== undefined && !isNaN(collectionId)) {
        const collection = await collectionService.findById(
          parseInt(collectionId)
        );

        if (collection && collection.userId === req.user.id) {
          const validMovieIDs = req.query.ids;

          for (const movieId of validMovieIDs) {
            let movie;
            if (!isNaN(movieId)) {
              movie = await movieService.findById(parseInt(movieId));
            }
            if (movie) {
              const isMovieBelongsToCollection =
                await collectionService.isMovieBelongsToCollection(
                  collection.id,
                  movie.id
                );
              if (!isMovieBelongsToCollection) {
                // Add Movie to the collection
                await collectionService.addMovieToCollection(
                  collection.id,
                  movie.id
                );
                result[movieId] = "ADDED";
              } else {
                // The Movie has already been added
                result[movieId] = "REPETITIVE";
              }
            } else {
              // The Movie does not exist
              result[movieId] = "NOTEXISTS";
            }
          }

          return res.json({ result });
        } else {
          const error = new Error("Invalid Collection");
          error.status = 500;
          return next(error);
        }
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      return next(error);
    }
  },

  removeMovie: async (req, res, next) => {
    collectionId = req.params.id;
    movieId = req.params.movieId;

    try {
      if (
        collectionId !== undefined &&
        !isNaN(collectionId) &&
        movieId !== undefined &&
        !isNaN(movieId)
      ) {
        const collection = await collectionService.findById(
          parseInt(collectionId)
        );
        const movie = await movieService.findById(parseInt(movieId));
        if (collection && movie) {
          // Check Collection Belongs to User
          if (collection.userId === req.user.id) {
            await collectionService.removeMovieFromCollection(
              collection.id,
              movie.id
            );
            return res.sendStatus(204);
          } else {
            error = new Error("It's Forbidden");
            error.status = 403;
            return next(error);
          }
        }
      }
      error = new Error("Invalid Request");
      error.status = 400;
      return next(error);
    } catch (error) {
      return next(error);
    }
  },

  update: async (req, res, next) => {
    // Should Validate Body Request
    collectionObject = req.body;

    collectionId = req.params.id;
    try {
      if (collectionId !== undefined && !isNaN(collectionId)) {
        oldCollection = await collectionService.findById(
          parseInt(collectionId)
        );
        if (oldCollection.userId === req.user.id) {
          newCollection = await collectionService.update(
            parseInt(collectionId),
            collectionObject
          );
          return res.status(202).json(newCollection);
        } else {
          error = new Error("It's Forbidden");
          error.status = 403;
          return next(error);
        }
      } else {
        const error = new Error("Invalid Collection");
        error.status = 500;
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  },

  destroy: async (req, res, next) => {
    collectionId = req.params.id;
    try {
      if (collectionId !== undefined && !isNaN(collectionId)) {
        oldCollection = await collectionService.findById(
          parseInt(collectionId)
        );
        if (oldCollection.userId === req.user.id) {
          await collectionService.destroy(parseInt(collectionId));
          return res.sendStatus(204);
        } else {
          error = new Error("It's Forbidden");
          error.status = 403;
          return next(error);
        }
      } else {
        const error = new Error("Invalid Collection");
        error.status = 500;
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = collectionController;
