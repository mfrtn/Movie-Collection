const { authController } = require("../api").authApp;

const express = require("express");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
