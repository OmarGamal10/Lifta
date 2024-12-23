const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const reviewController = require("../controllers/reviewController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
router.get(["/", "/rate"], (req, res, next) => {
  if (req.path === "/") return reviewController.getReviewsCoach(req, res, next);
  else if (req.path === "/rate") {
    return reviewController.getCoachRate(req, res, next);
  }
});

router.get("/reviewData/:reviewId", (req, res, next) => {
  return reviewController.getReviewByReviewId(req, res, next);
});

router.get("/:traineeId", (req, res, next) => {
  return reviewController.getReviewsTrainee(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  reviewController.createReview
);

router.delete("/:reviewId", reviewController.deleteReview);

router.patch("/:reviewId", convertCamelToSnake, (req, res, next) => {
  return reviewController.updateReview(req, res, next);
});

module.exports = router;
