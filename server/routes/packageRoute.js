const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const packageController = require("../controllers/packageController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");

//macthes to either /packages or /users/:coachId/packages
router.get("/", (req, res, next) => {
  return req.params.coachId
    ? packageController.getPackagesCoach(req, res, next)
    : packageController.getAllPackages(req, res, next);
});

router.get("/topFive", packageController.getTopFivePackages);
router.get("/averagePrice", packageController.getAvgPrice);
router.get("/packagesDetails", packageController.getPackagesDetails);

router.get("/:pkgId", packageController.getPackage);
router.patch(
  "/:pkgId",
  convertCamelToSnake,
  sanitizeEmptyFields,
  packageController.updatePackage
);

router.patch(
  "/:pkgId/activate",
  convertCamelToSnake,
  sanitizeEmptyFields,
  packageController.toggleActiveState
);
router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  packageController.createPackage
);

router.delete("/", convertCamelToSnake, packageController.deletePackage);

module.exports = router;
