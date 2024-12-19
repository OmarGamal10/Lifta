const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const workoutController = require("../controllers/workoutController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");

router.get("/", (req, res, next) => {
  return workoutController.getCurrentWorkoutByTraineeId(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  workoutController.addtoWorkoutLog
);

router.get("/status", (req, res, next) => {
  return workoutController.getCurrentWorkoutStatus(req, res, next);
});

module.exports = router;
