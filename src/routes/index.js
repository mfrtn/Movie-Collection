const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const collectionRouter = require("./collection.route");
const movieRouter = require("./movie.route");

function apiRouter(app) {
  app.use("/", authRouter);
  app.use("/users", userRouter);
  app.use("/collections", collectionRouter);
  app.use("/movies", movieRouter);
}

module.exports = apiRouter;
