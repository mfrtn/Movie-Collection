const { userController } = require("../api").userApp;
const { authJWT, admin, self } = require("../middlewares").auth;

const express = require("express");
const router = express.Router();

router.use(authJWT);
router.get("/", admin, userController.index);
router.get("/:id", self, userController.index);

module.exports = router;
