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
  console.log(trainer_id, title, photo, description, date_issued);
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

const editCertificate = async (req, res, next) => {
  const { certificate_id } = req.params;
  const { trainer_id, title, photo, description, date_issued } = req.body;

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
