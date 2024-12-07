const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const packageController = require("../controllers/packageController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");

//macthes to either /packages or /users/:coachId/packages
router.get("/", (req, res, next) => {
  return req.params.coachId
    ? packageController.getPackagesCoach(req, res, next)
    : packageController.getAllPackages(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  packageController.createPackage
);

module.exports = router;
