//any helper functions in the utils folder
const validator = require("validator");
const AppError = require("../utils/AppError");
const { hashPassword, validatePassword } = require("../utils/hashPassword");
const createToken = require("../utils/createToken");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

// Log-In
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email))
    return next(new AppError("Please enter a valid Email", 400));

  const user = await userModel.SelectUserByEmail(email);

  if (!user) return next(new AppError("User not found", 404));

  if (!(await validatePassword(password, user["password"])))
    return next(new AppError("Incorrect password", 401));

  const userRest = await userModel.SelectTraineeOrTrainerById(
    user.user_id,
    user.type.toLowerCase()
  );
  //jwt token by cookie
  const payload = {
    user_id: user.user_id,
    email: user.email,
    phone_number: user.phone_number,
    type: user.type,
  };

  const token = createToken(payload);
  res.cookie("jwt", token);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        ...user,
        ...userRest,
      },
      token: JSON.parse(atob(token.split(".")[1])),
    },
  });
};

// Sign-Up

const signup = async (req, res, next) => {
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
  //const gender = req.body.gender === "male" ? "M" : "F";

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
    ({ food_allergies, workout_preferences, weight, height, goal } = req.body);
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
        client_limit,
        title,
        photo,
        description,
        date_issued
      );
  await userModel.AddUser(values);

  //jwt token by cookie
  const payload = {
    email,
    phone_number,
    type,
  };

  const token = createToken(payload);
  res.cookie("jwt", token);

  res.status(200).json({
    status: "success",
    data: {
      token: JSON.parse(atob(token.split(".")[1])),
    },
  });
};

// Log-out => Reset Cookie

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/users");
};

module.exports = {
  login: catchAsync(login),
  signup: catchAsync(signup),
  logout,
};
