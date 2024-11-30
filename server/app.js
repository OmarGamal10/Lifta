const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const cookie_parser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));
console.log(db.query);

app.use("/users",userRouter);

// error handling middleware
app.use(errorHandler);

// //for testing
// app.get("/", async (req, res) => {
//   const results = await db.query("SELECT * FROM lifta_schema.users");
//   res.status(200).json({
//     status: "success",
//     data: {
//       users: results.rows,
//     },
//   });
// });


app.use((req, res, next) => {
  return next(new AppError(`There is no page for ${req.originalUrl} `, 404));
});
//error handling middleware

app.use(errorHandler);

module.exports = app;
