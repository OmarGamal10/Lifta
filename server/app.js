const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken")
const cookie_parser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const packageRouter = require("./routes/packageRoute");
const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const cors = require("cors");
const { configDotenv } = require("dotenv");

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true); // Allow requests from localhost with any port
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));


app.get("/api/checkAuth", (req, res) => {
  // Retrieve the token from the cookies
  const token = req.cookies.jwt;

  // If no token is found, return an error response
  if (!token) {
    return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // Extract userId and userType from the token payload
    const { userId, userType } = decoded;

    // Respond with user information
    return res.status(200).json({
      isAuthenticated: true
    });
  } catch (err) {
    // Handle invalid or expired tokens
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ isAuthenticated: false, message: "Invalid or expired token" });
  }
});


app.use("/users", userRouter);

app.use("/packages", packageRouter);

// error handling middleware
app.use(errorHandler);


app.use((req, res, next) => {
  return next(new AppError(`There is no page for ${req.originalUrl} `, 404));
});
//error handling middleware

app.use(errorHandler);

module.exports = app;



