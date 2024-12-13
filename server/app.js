const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const cookie_parser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const packageRouter = require("./routes/packageRoute");
const ingredientRouter = require("./routes/ingredientRoute");
const exerciseRouter = require("./routes/exerciseRoute");
const reviewRouter = require("./routes/reviewRoute");
const workoutRouter = require("./routes/workoutRoute");
const mealRouter = require("./routes/mealRoute");

const certificateRouter = require("./routes/certificateRoute");

const subscriptionRouter = require("./routes/subscriptionRoute");
const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const cors = require("cors");
const { configDotenv } = require("dotenv");

const app = express();
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin && /^http:\/\/localhost:\d+$/.test(origin)) {
//         callback(null, true); // Allow requests from localhost with any port
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(morgan("dev"));
app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/coaches", userRouter);
app.use("/trainees", userRouter);

app.use("/packages", packageRouter);

app.use("/subscriptions", subscriptionRouter);
app.use("/ingredients", ingredientRouter);
app.use("/exercises", exerciseRouter);
app.use("/reviews", reviewRouter);
app.use("/certificates", certificateRouter);
app.use("/workouts", workoutRouter);
app.use("/meals", mealRouter);

// error handling middleware
app.use(errorHandler);

app.use((req, res, next) => {
  return next(new AppError(`There is no page for ${req.originalUrl} `, 404));
});
//error handling middleware

app.use(errorHandler);

module.exports = app;
