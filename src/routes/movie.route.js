const { movieController } = require("../api").movieApp;
const { authJWT, operator } = require("../middlewares").auth;

const express = require("express");
const router = express.Router();

router.use(authJWT);
router.get("/", movieController.index);
router.get("/:id", movieController.index);
router.post("/", operator, movieController.create);

module.exports = router;
