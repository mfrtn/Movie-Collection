const config = require("../config");
const apiRouter = require("../routes");
const { errorHandler } = require("../middlewares").error;

const express = require("express");
const router = express.Router();

class ExpressLoader {
  constructor() {
    this.apiApp = express();
    this.apiApp.use(express.json());

    this.apiApp.use("/api", router);

    apiRouter(router);

    this.apiApp.use(errorHandler);

    this.apiApp.use((req, res) => {
      res.status(404).json({
        error: {
          status: true,
          code: 404,
          message: "This API path deos not exist",
        },
      });
    });
  }
  apiRun() {
    this.apiApp.listen(config.PORT, () => {
      console.log(
        `${config.APP_NAME} app server is running on port ${config.PORT}`
      );
    });
  }
}

module.exports = ExpressLoader;
