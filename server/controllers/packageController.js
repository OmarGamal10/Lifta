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

const createPackage = async (req, res, next) => {
  const { name, description, price, trainer_id, duration, type } = req.body;
  if (!name || !duration || !price || !trainer_id || !type) {
    return next(new AppError("Please provide all required fields", 400));
  }
  if (isNaN(Number(duration)) || Number(duration) <= 0) {
    return next(new AppError("Please provide a valid duration", 400));
  }

  if (isNaN(Number(price)) || Number(price) <= 0) {
    return next(new AppError("Please provide a valid price", 400));
  }
  const package = await packageModel.createPackage(
    name,
    price,
    trainer_id,
    duration,
    type,
    description,
    (is_active = true)
  );
  res.status(201).json({
    status: "success",
    data: {
      package,
    },
  });
};
const deletePackage = async (req, res, next) => {
  const { package_id } = req.body;
  await packageModel.deletePackage(package_id);
  res.status(200).json({
    status: "success",
    message: "Package deleted successfully",
  });
};

module.exports = {
  getAllPackages: catchAsync(getAllPackages),
  getPackagesCoach: catchAsync(getPackagesCoach),
  createPackage: catchAsync(createPackage),
  deletePackage: catchAsync(deletePackage),
};

// /packages
// users/:id/packages
