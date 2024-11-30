const router = require("express").Router();
const authController = require("../controllers/authController");
const AppError = require("../utils/AppError");

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Lifta API",
  });
});

router.post("/login", authController.login);

module.exports = router;
