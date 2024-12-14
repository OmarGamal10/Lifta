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

const getCurrentWorkoutByTraineeId = async (req, res, next) => {
  const { traineeId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const workout = await workoutModel.getCurrentWorkoutByTraineeId(traineeId);
  res.status(200).json({
    status: "success",
    data: {
      workout,
    },
  });
};

const addDoneWorkout = async (req, res, next) => {
  const { trainee_id, workout_id } = req.body;

  await workoutModel.addDoneWorkout(trainee_id, workout_id);
  res.status(201).json({
    status: "success",
    message: "Good Job!",
  });
};

const getCurrentWorkoutStatus = async (req, res, next) => {
  const { traineeId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const isDone = await workoutModel.getCurrentWorkoutStatus(traineeId);
  res.status(200).json({
    status: "success",
    data: {
      isDone,
    },
  });
};

module.exports = {
  createWorkout: catchAsync(createWorkout),
  getWorkoutsCoach: catchAsync(getWorkoutsCoach),
  getCurrentWorkoutByTraineeId: catchAsync(getCurrentWorkoutByTraineeId),
  addDoneWorkout: catchAsync(addDoneWorkout),
  getCurrentWorkoutStatus: catchAsync(getCurrentWorkoutStatus),
};
