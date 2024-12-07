const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const cookie_parser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const packageRouter = require("./routes/packageRoute");
const ingredientRouter = require("./routes/ingredientRoute");

const subscriptionRouter = require("./routes/subscriptionRoute");
const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use("/packages", packageRouter);

app.use("/subscriptions", subscriptionRouter);
app.use("/ingredients", ingredientRouter);

// error handling middleware
app.use(errorHandler);

app.use((req, res, next) => {
  return next(new AppError(`There is no page for ${req.originalUrl} `, 404));
});
//error handling middleware

app.use(errorHandler);

module.exports = app;
