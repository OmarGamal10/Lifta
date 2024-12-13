const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const workoutModel = require("../models/workoutModel");

const createWorkout = async (req, res, next) => {
  const { name, _note, trainer_id, exercises } = req.body;

  const workout = await workoutModel.createWorkout(
    trainer_id,
    name,
    _note,
    exercises
  );
  res.status(201).json({
    status: "success",
    data: {
      workout,
    },
  });
};

const getWorkoutsCoach = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  const workouts = await workoutModel.getWorkoutsByCoachId(coachId);
  res.status(200).json({
    status: "success",
    data: {
      workouts,
    },
  });
};

const deleteWorkout = async (req, res, next) => {
  const { workout_id } = req.body;
  await workoutModel.deleteWorkout(workout_id);
  res.status(200).json({
    status: "success",
    message: "Workout deleted successfully",
  });
};

const removeExerciseFromWorkout = async (req, res, next) => {
  const { exercise_id } = req.body;
  const { workoutId: workout_id } = req.params;
  await workoutModel.removeExerciseFromWorkout(workout_id, exercise_id);
  res.status(200).json({
    status: "success",
    message: "Exercise removed successfully",
  });
};

module.exports = {
  createWorkout: catchAsync(createWorkout),
  getWorkoutsCoach: catchAsync(getWorkoutsCoach),
  deleteWorkout: catchAsync(deleteWorkout),
  removeExerciseFromWorkout: catchAsync(removeExerciseFromWorkout),
};
