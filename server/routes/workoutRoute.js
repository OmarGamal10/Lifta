const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const workoutController = require("../controllers/workoutController");
const exerciseRouter = require("./exerciseRoute");

const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");

router.get("/", (req, res, next) => {
  return workoutController.getWorkoutsCoach(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  workoutController.createWorkout
);

router.delete("/", convertCamelToSnake, workoutController.deleteWorkout);

router.use("/:workoutId/exercises", exerciseRouter);

module.exports = router;
