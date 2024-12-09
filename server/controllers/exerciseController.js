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

module.exports = {
  getExercisesCoach: catchAsync(getExercisesCoach),
  createExercise: catchAsync(createExercise),
};
