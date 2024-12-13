const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const exerciseModel = require("../models/exerciseModel");

const getExercisesCoach = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  const exercises = await exerciseModel.getExercisesByCoachId(coachId);
  res.status(200).json({
    status: "success",
    data: {
      exercises,
    },
  });
};

const getExercisesWorkout = async (req, res, next) => {
  const { workoutId } = req.params;
  if (!workoutId || isNaN(workoutId)) {
    return next(new AppError("Please provide a workout id", 400));
  }
  const exercises = await exerciseModel.getExercisesByWorkoutId(workoutId);
  res.status(200).json({
    status: "success",
    data: {
      exercises,
    },
  });
};

const createExercise = async (req, res, next) => {
  const { name, muscle_group, gif, description, trainer_id } = req.body;

  const exercise = await exerciseModel.createExercise(
    trainer_id,
    name,
    muscle_group,
    description,
    gif
  );
  res.status(201).json({
    status: "success",
    data: {
      exercise,
    },
  });
};

const deleteExercise = async (req, res, next) => {
  const { exercise_id } = req.body;
  await exerciseModel.deleteExercise(exercise_id);
  res.status(200).json({
    status: "success",
    message: "Exercise deleted successfully",
  });
};

module.exports = {
  getExercisesCoach: catchAsync(getExercisesCoach),
  createExercise: catchAsync(createExercise),
  deleteExercise: catchAsync(deleteExercise),
  getExercisesWorkout: catchAsync(getExercisesWorkout),
};
