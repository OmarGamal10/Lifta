const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const certificateController = require("../controllers/certificateController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
router.get("/", (req, res, next) => {
  return certificateController.getCertificatesCoach(req, res, next);
});
router.get("/:certId", (req, res, next) => {
  return certificateController.getCertificateById(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  certificateController.createCertificate
);

router.patch(
  "/:certificate_id",
  convertCamelToSnake,
  sanitizeEmptyFields,
  certificateController.editCertificate
);
router.delete("/:certificate_id", (req, res, next) =>
  certificateController.deleteCertificate(req, res, next)
);

module.exports = router;
