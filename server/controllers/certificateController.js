const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const certificateModel = require("../models/certificateModel");
const validator = require("validator");
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
const getCertificateById = async (req, res, next) => {
  const { certId } = req.params;
  if (!certId || isNaN(certId)) {
    return next(new AppError("Please provide a certificate id", 400));
  }
  const certificate = await certificateModel.getCertificateById(certId);
  res.status(200).json({
    status: "success",
    data: {
      certificate,
    },
  });
};
const createCertificate = async (req, res, next) => {
  const { trainer_id, title, photo, description, date_issued } = req.body;

  // Title validation
  if (!title || !validator.isAlpha(title.replace(/\s/g, ""))) {
    return next(
      new AppError("Certificate title should contain only letters", 400)
    );
  }

  if (title.trim().length < 3 || title.trim().length > 50) {
    return next(new AppError("Title must be between 3 and 50 characters", 400));
  }

  // Description validation
  if (
    !description ||
    description.trim().length < 10 ||
    description.trim().length > 250
  ) {
    return next(
      new AppError("Description must be between 10 and 250 characters", 400)
    );
  }

  if (photo && !validator.isURL(photo)) {
    return next(new AppError("Please provide a valid photo URL", 400));
  }

  try {
    const certificate = await certificateModel.createCertificate(
      trainer_id,
      title.trim(),
      description.trim(),
      date_issued,
      photo
    );

    res.status(201).json({
      status: "success",
      data: { certificate },
    });
  } catch (err) {
    return next(new AppError("Error creating certificate", 500));
  }
};

const editCertificate = async (req, res, next) => {
  const { certificate_id } = req.params;
  const { trainer_id, title, photo, description, date_issued } = req.body;

  if (!title || !validator.isAlpha(title.replace(/\s/g, ""))) {
    return next(
      new AppError("Certificate title should contain only letters", 400)
    );
  }

  if (
    !description ||
    description.trim().length < 10 ||
    description.trim().length > 250
  ) {
    return next(
      new AppError("Description must be between 10 and 250 characters", 400)
    );
  }

  const certificate = await certificateModel.editCertificate(
    certificate_id,
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

const deleteCertificate = async (req, res, next) => {
  const { certificate_id } = req.body;

  const certificate = await certificateModel.deleteCertificate(certificate_id);
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
  editCertificate: catchAsync(editCertificate),
  deleteCertificate: catchAsync(deleteCertificate),
  getCertificateById: catchAsync(getCertificateById),
};
