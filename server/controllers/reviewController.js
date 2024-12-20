const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const reviewModel = require("../models/reviewModel");

const getReviewsCoach = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  const reviews = await reviewModel.getReviewsByCoachId(coachId);
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
};

const getReviewsTrainee = async (req, res, next) => {
  const { traineeId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const reviews = await reviewModel.getReviewsByTraineeId(traineeId);
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
};


const getCoachRate = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  const rate = await reviewModel.getTotalCoachRate(coachId);
  res.status(200).json({
    status: "success",
    data: {
      rate,
    },
  });
};

const createReview = async (req, res, next) => {
  const { trainer_id, trainee_id, content, stars } = req.body;

  if (isNaN(Number(stars)) || Number(stars) <= 0) {
  }

  const reviews = await reviewModel.createReview(
    trainer_id,
    trainee_id,
    content,
    stars
  );
  res.status(201).json({
    status: "success",
    data: {
      reviews,
    },
  });
};

module.exports = {
  getReviewsCoach: catchAsync(getReviewsCoach),
  createReview: catchAsync(createReview),
  getCoachRate: catchAsync(getCoachRate),
  getReviewsTrainee: catchAsync(getReviewsTrainee),
};
