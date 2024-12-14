const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const workoutController = require("../controllers/workoutController");
const exerciseRouter = require("./exerciseRoute");


router.get("/", (req, res, next) => {
  return workoutController.getCurrentWorkoutByTraineeId(req, res, next);
});

// router.use("/:workoutId/exercises", exerciseRouter);

module.exports = router;
