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

router.get("/trainee/:traineeId", workoutController.getWorkoutsTrainee);
router.get("/log/:traineeId", workoutController.getWorkoutLog);
router.get(
  "/log/:traineeId/trainer/:trainerId",
  workoutController.getWorkoutLog
);
router.post("/trainee", workoutController.assignWorkoutTrainee);
router.patch("/trainee", workoutController.markWorkoutAsDone);

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  workoutController.createWorkout
);

router.delete("/", convertCamelToSnake, workoutController.deleteWorkout);
router.delete(
  "/:workoutId/trainee",
  convertCamelToSnake,
  workoutController.removeWorkoutFromSchedule
);

router.use("/:workoutId/exercises", exerciseRouter);

module.exports = router;
