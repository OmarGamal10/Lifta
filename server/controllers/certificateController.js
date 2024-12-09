const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const certificateModel = require("../models/certificateModel");

const getCertificatesCoach = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  const certificate = await certificateModel.getCertificatesByCoachId(coachId);
  res.status(200).json({
    status: "success",
    data: {
      certificate,
    },
  });
};

const createCertificate = async (req, res, next) => {
  const { trainer_id, title, photo, description, date_issued } = req.body;

  const certificate = await certificateModel.createCertificate(
    trainer_id,
    title,
    description,
    date_issued,
    photo
  );
  res.status(201).json({
    status: "success",
    data: {
      certificate,
    },
  });
};

module.exports = {
  getCertificatesCoach: catchAsync(getCertificatesCoach),
  createCertificate: catchAsync(createCertificate),
};
