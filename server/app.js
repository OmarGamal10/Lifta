const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

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

module.exports = app;
