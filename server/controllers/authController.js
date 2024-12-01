//any helper functions in the utils folder
const validator = require("validator");
const AppError = require("../utils/AppError");
const { hashPassword, validatePassword } = require("../utils/hashPassword");
const createToken = require("../utils/createToken");
const userModel = require("../models/userModel");

// Log-In
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email))
      return next(new AppError("Please enter a valid Email", 400));

    const user = await userModel.SelectUserByEmail(email);

    if (!user) return next(new AppError("User not found", 404));

    if (!(await validatePassword(password, user["password"])))
      return next(new AppError("Incorrect password", 401));

    //jwt token by cookie
    const payload = {
      user_id: user["user_id"],
      email: user["email"],
      phone_number: user["phone_number"],
    };

    const token = createToken(payload);
    res.cookie("jwt", token);

    res.status(200).json({
      status: "success",
      data: {
        user,
        token: JSON.parse(atob(token.split(".")[1])),
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Sign-Up

exports.signup = async (req, res, next) => {
  try {
    const {
      email,
      first_name,
      last_name,
      password,
      gender,
      bio,
      phone_number,
      type,
    } = req.body;

    let food_allergies,
      workout_preferences,
      weight,
      height,
      goal,
      experience_years,
      rating,
      client_limit,
      title,
      photo,
      description,
      date_issued;
    if (type === "Trainee") {
      ({ food_allergies, workout_preferences, weight, height, goal } =
        req.body);
    } else {
      ({
        experience_years,
        rating,
        client_limit,
        title,
        photo,
        description,
        date_issued,
      } = req.body);
    }

    if (!validator.isEmail(email))
      return next(new AppError("Please enter a valid Email", 400));

    const passwordHashed = await hashPassword(password);
    const values = [
      email,
      first_name,
      last_name,
      passwordHashed,
      gender,
      bio,
      phone_number,
      type,
    ];
    type === "Trainee"
      ? values.push(food_allergies, weight, height, goal, workout_preferences)
      : values.push(
          experience_years,
          rating,
          client_limit,
          title,
          photo,
          description,
          date_issued
        );
    await userModel.AddUser(values);

    //jwt token by cookie
    const payload = {
      email: email,
      phone_number: phone_number,
    };

    const token = createToken(payload);
    res.cookie("jwt", token);

    res.status(200).json({
      status: "success",
      data: {
        token: JSON.parse(atob(token.split(".")[1])),
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Log-out => Reset Cookie

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/users");
};
