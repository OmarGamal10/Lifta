//any helper functions in the utils folder
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const db = require(".././db");
const AppError = require("../utils/AppError");
const { hashPassword, validatePassword } = require("../utils/hashPassword");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email))
      return next(new AppError("Please enter a valid Email", 400));

    const user = await db.query(
      "SELECT * FROM lifta_schema.users WHERE email = $1",
      [email]
    );

    if (!user) return next(new AppError("User not found", 404));

    if (!(await validatePassword(password, user.rows[0].password)))
      return next(new AppError("Incorrect password", 401));

    //jwt token by cookie

    res.status(200).json({
      status: "success",
      data: {
        user: user.rows[0],
      },
    });
  } catch (error) {
    console.error("Error finding user by email:", error);
    next(error);
  }
};
