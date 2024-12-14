const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const exerciseController = require("../controllers/exerciseController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
router.get("/", (req, res, next) => {
  if (req.params.coachId)
    return exerciseController.getExercisesCoach(req, res, next);
  else if (req.params.workoutId)
    return exerciseController.getExercisesWorkout(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  exerciseController.createExercise
);

router.delete("/", convertCamelToSnake, exerciseController.deleteExercise);

module.exports = router;
