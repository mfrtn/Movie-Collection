const userRouter = require("./user.route");
const authRouter = require("./auth.route");

function apiRouter(app) {
  app.use("/", authRouter);
  app.use("/users", userRouter);
}

module.exports = apiRouter;
