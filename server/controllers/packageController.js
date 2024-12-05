const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const packageModel = require("../models/packageModel");

const getAllPackages = async (req, res, next) => {
  const packages = await packageModel.getAllPackages();
  res.status(200).json({
    status: "success",
    data: {
      packages,
    },
  });
};

const getPackagesCoach = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  console.log(coachId);
  const packages = await packageModel.getPackagesByCoachId(coachId);
  res.status(200).json({
    status: "success",
    data: {
      packages,
    },
  });
};

module.exports = {
  getAllPackages: catchAsync(getAllPackages),
  getPackagesCoach: catchAsync(getPackagesCoach),
};

// /packages
// users/:id/packages
