const movieService = require("./movie.service");

const movieController = {
  index: async (req, res, next) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const movies = await movieService.findMany();
        return res.json(movies).end();
      } else if (!isNaN(id)) {
        const movie = await movieService.findById(parseInt(id));
        if (movie) {
          return res.json(movie).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  },

  create: async (req, res, next) => {
    // Should Validate Body Request
    movieObject = req.body;
    try {
      newObj = await movieService.create(movieObject);
      return res.json(newObj).end();
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = movieController;
