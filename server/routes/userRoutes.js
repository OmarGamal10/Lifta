const db = require("../db");
const router = require("express").Router();
const authController = require("../controllers/authController");
const userModel = require("../models/userModel");
const convertToSnakeCase = require("../middlewares/camelToSnakeMiddleware");
const packageRouter = require("./packageRoute");
const ingredientRouter = require("./ingredientRoute");
const exerciseRouter = require("./exerciseRoute");
const reviewRouter = require("./reviewRoute");
const certificateRouter = require("./certificateRoute");
const clientsRouter = require("./clientsRoute");
const workoutRouter = require("./workoutRoute");
const mealRouter = require("./mealRoute");
const adminController = require("../controllers/adminController");
const traineeCurrentWorkoutRouter = require("./traineeCurrentWorkoutRoute");
const traineeCurrentMealsRouter = require("./traineeCurrentMealsRoute");

//for testing without opening pgAdmin (getting all users)
router.get("/", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      users: await userModel.getAllUsers(),
    },
  });
});

//Admin routes
router.get("/coaches", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      coaches: await userModel.getAllCoaches(),
    },
  });
});

router.get("/trainees", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      trainees: await userModel.getAllTrainees(),
    },
  });
});

router.get("/admins", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      admins: await userModel.getAllAdmins(),
    },
  });
});

router.get("/browse", async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      coaches: await userModel.getAvailableCoaches(),
    },
  });
});
router.delete("/:userId", adminController.deleteUserByUserId);
router.patch("/:userId/ban", adminController.banUser);
router.patch("/:userId/unban", adminController.unbanUser);

//auth routes
router.post("/login", authController.login);
router.post("/signup", convertToSnakeCase, authController.signup);
router.post("/createAccount", convertToSnakeCase, authController.createAccount);
router.get("/logout", authController.logout);
router.get("/checkAuth", authController.checkAuth);
router.get("/:userId", authController.getUserById);

router.use("/:coachId/clients", clientsRouter);
//coach packages
router.use("/:coachId/packages", packageRouter);
router.use("/:coachId/exercises", exerciseRouter);
router.use("/:coachId/ingredients", ingredientRouter);
router.use("/:coachId/reviews", reviewRouter);
router.use("/:coachId/certificates", certificateRouter);
router.use("/:coachId/workouts", workoutRouter);
router.use("/:nutritionistId/meals", mealRouter);

router.use("/:traineeId/currentWorkout", traineeCurrentWorkoutRouter);
router.use("/:traineeId/currentMeals", traineeCurrentMealsRouter);

module.exports = router;

// /users/:id/packages
// /packages
