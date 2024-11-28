const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/", (req, res, next) => {
  return next(new AppError("This is a fkn err", 400));
  res.status(200).json({
    status: "success",
    message: "Welcome to the Lifta API",
  });
});

router.post("/login", authController.login);

module.exports = router;
