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

const assignWorkoutTrainee = async (req, res, next) => {
  const { trainee_id, workout_id, day } = req.body;
  if (!trainee_id || isNaN(trainee_id)) {
    return next(new AppError("Please provide a trainee id", 400));
  }

  if (!workout_id || isNaN(workout_id)) {
    return next(new AppError("Please provide a workout id", 400));
  }
  const newWorkout = {
    new: true,
  };
  const workout = await workoutModel.assignWorkoutToTrainee(
    trainee_id,
    workout_id,
    day,
    newWorkout
  );
  if (newWorkout.new) {
    workout.new = true;
  } else {
    workout.new = false;
  }
  res.status(201).json({
    status: "success",
    data: {
      workout,
    },
  });
};

const getWorkoutsTrainee = async (req, res, next) => {
  const { traineeId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const workouts = await workoutModel.getWorkoutsByTraineeId(traineeId);
  res.status(200).json({
    status: "success",
    data: {
      workouts,
    },
  });
};

const addtoWorkoutLog = async (req, res, next) => {
  const { trainee_id, workout_id } = req.body;

  await workoutModel.addtoWorkoutLog(trainee_id, workout_id);
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

const removeWorkoutFromSchedule = async (req, res, next) => {
  const { trainee_id } = req.body;
  const { workoutId: workout_id } = req.params;
  await workoutModel.removeWorkoutFromSchedule(workout_id, trainee_id);
  res.status(200).json({
    status: "success",
    message: "Workout removed successfully",
  });
};

const getWorkoutLog = async (req, res, next) => {
  const { traineeId, trainerId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const workoutLog = await workoutModel.getWorkoutLog(traineeId, trainerId);
  res.status(200).json({
    status: "success",
    data: {
      workoutLog,
    },
  });
};

const markWorkoutAsDone = async (req, res, next) => {
  const { trainee_id, date } = req.body;
  await workoutModel.markWorkoutAsDone(trainee_id, workout_id, date);
  res.status(200).json({
    status: "success",
    message: "Workout marked as done",
  });
};

module.exports = {
  createWorkout: catchAsync(createWorkout),
  getWorkoutsCoach: catchAsync(getWorkoutsCoach),
  getCurrentWorkoutByTraineeId: catchAsync(getCurrentWorkoutByTraineeId),
  addtoWorkoutLog: catchAsync(addtoWorkoutLog),
  getCurrentWorkoutStatus: catchAsync(getCurrentWorkoutStatus),
  deleteWorkout: catchAsync(deleteWorkout),
  removeExerciseFromWorkout: catchAsync(removeExerciseFromWorkout),
  assignWorkoutTrainee: catchAsync(assignWorkoutTrainee),
  getWorkoutsTrainee: catchAsync(getWorkoutsTrainee),
  removeWorkoutFromSchedule: catchAsync(removeWorkoutFromSchedule),
  getWorkoutLog: catchAsync(getWorkoutLog),
  markWorkoutAsDone: catchAsync(markWorkoutAsDone),
};
