const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(db.query);

//for testing
app.get("/", async (req, res) => {
  const results = await db.query("SELECT * FROM lifta_schema.users");
  res.status(200).json({
    status: "success",
    data: {
      users: results.rows,
    },
  });
});

app.use("/lifta/users", userRouter);

app.use((req, res, next) => {
  return next(new AppError(`There is no page for ${req.originalUrl} `, 404));
});
//error handling middleware

app.use(errorHandler);

module.exports = app;
