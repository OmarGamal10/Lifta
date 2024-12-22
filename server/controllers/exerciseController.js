const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const exerciseModel = require("../models/exerciseModel");
const validator = require("validator");
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

const getExercise = async (req, res, next) => {
  const { exId } = req.params;
  if (!exId || isNaN(exId)) {
    return next(new AppError("Please provide a exercise id", 400));
  }
  const exercise = await exerciseModel.getExerciseById(exId);
  console.log(exercise);
  res.status(200).json({
    status: "success",
    data: {
      exercise,
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

  if (!name || !validator.isAlpha(name.replace(/\s/g, ""))) {
    return next(new AppError("Exercise name should contain only letters", 400));
  }

  if (!muscle_group || !validator.isAlpha(muscle_group.replace(/\s/g, ""))) {
    return next(new AppError("Muscle Group should contain only letters", 400));
  }

  if (
    !description ||
    description.trim().length < 10 ||
    description.trim().length > 500
  ) {
    return next(
      new AppError("Description must be between 10 and 500 characters", 400)
    );
  }

  if (gif && !validator.isURL(gif)) {
    return next(new AppError("Please provide a valid GIF", 400));
  }

  if (!trainer_id) {
    return next(new AppError("Trainer ID is required", 400));
  }

  try {
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
  } catch (err) {
    return next(new AppError("Error creating exercise", 500));
  }
};
const updateExercise = async (req, res, next) => {
  const { exId } = req.params;
  const { name, muscle_group, description } = req.body;

  if (!exId || isNaN(exId)) {
    return next(new AppError("Please provide a exercise id", 400));
  }

  if (!name || !validator.isAlpha(name.replace(/\s/g, ""))) {
    return next(new AppError("Exercise name should contain only letters", 400));
  }

  if (!muscle_group || !validator.isAlpha(muscle_group.replace(/\s/g, ""))) {
    return next(new AppError("Muscle Group should contain only letters", 400));
  }

  if (
    !description ||
    description.trim().length < 10 ||
    description.trim().length > 500
  ) {
    return next(
      new AppError("Description must be between 10 and 500 characters", 400)
    );
  }

  const exercise = await exerciseModel.updateExercise(
    name,
    muscle_group,
    description,
    exId
  );

  res.status(200).json({
    status: "success",
    message: "Exercise updated successfully",
    data: { exercise },
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
  getExercise: catchAsync(getExercise),
  updateExercise: catchAsync(updateExercise),
};
