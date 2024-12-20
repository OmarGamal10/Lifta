const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const exerciseController = require("../controllers/exerciseController");
const workoutController = require("../controllers/workoutController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
router.get("/", (req, res, next) => {
  if (req.params.coachId)
    return exerciseController.getExercisesCoach(req, res, next);
  else if (req.params.workoutId)
    return exerciseController.getExercisesWorkout(req, res, next);
});

router.get("/:exId", (req, res, next) => {
  return exerciseController.getExercise(req, res, next);
});

router.patch("/:exId", convertCamelToSnake, (req, res, next) => {
  return exerciseController.updateExercise(req, res, next);
});
router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  exerciseController.createExercise
);

router.delete("/", convertCamelToSnake, (req, res, next) => {
  if (req.params.workoutId)
    return workoutController.removeExerciseFromWorkout(req, res, next);
  else {
    return exerciseController.deleteExercise(req, res, next);
  }
});

module.exports = router;
