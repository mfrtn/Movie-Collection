const { collectionController } = require("../api").collectionApp;
const { authJWT, operator } = require("../middlewares").auth;

const express = require("express");
const router = express.Router();

router.use(authJWT);
router.get("/", collectionController.index);
router.get("/:id", collectionController.index);
router.post("/", collectionController.create);
router.post("/:id/movies", collectionController.addMovies);
router.delete("/:id/movies/:movieId", collectionController.removeMovie);
router.patch("/:id", collectionController.update);
router.delete("/:id", collectionController.destroy);
router.post("/:id", collectionController.rate);
router.get("/:id/rates", collectionController.findCollectionWithRates);

module.exports = router;
