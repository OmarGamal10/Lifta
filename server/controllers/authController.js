//any helper functions in the utils folder
const validator = require("validator");
const AppError = require("../utils/AppError");
const { hashPassword, validatePassword } = require("../utils/hashPassword");
const createToken = require("../utils/createToken");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  const userId = req.params.userId;

  const user = await userModel.SelectUserById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    userId: userId,
    userName: user["first_name"] + " " + user["last_name"],
    userType: user["type"],
    userBio: user["bio"],
    userPhoto: user["photo"],
  });
};

const checkAuth = async (req, res) => {
  // Retrieve the token from the cookies
  const token = req.cookies.jwt;

  // If no token is found, return an error response
  if (!token) {
    return res.status(401).json({
      isAuthenticated: false,
      userId: "",
      userType: "",
      message: "No token provided",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // Extract userId and userType from the token payload
    const { user_id, type } = decoded;

    // Respond with user information
    return res.status(200).json({
      isAuthenticated: true,
      userId: user_id,
      userType: type,
    });
  } catch (err) {
    // Handle invalid or expired tokens
    console.error("Token verification failed:", err.message);
    return res.status(401).json({
      isAuthenticated: false,
      userId: "",
      userType: "",
      message: "Invalid or expired token",
    });
  }
};

// Log-In
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email))
    return next(new AppError("Please enter a valid Email", 400));

  const user = await userModel.SelectUserByEmail(email);

  if (!user) return next(new AppError("User not found", 404));

  if (!(await validatePassword(password, user["password"])))
    return next(new AppError("Incorrect password", 401));

  if(user.type === "Admin") {
    //jwt token by cookie
    const payload = {
      user_id: user.user_id,
      email: user.email,
      type: user.type,
    };
  
    const token = createToken(payload);
    res.cookie("jwt", token);
  
    res.status(200).json({
      status: "success",
      data: {
        user: {
          user,
        },
        token: JSON.parse(atob(token.split(".")[1])),
      },
    });
  }
  const userRest = await userModel.SelectTraineeOrTrainerById(
    user.user_id,
    user.type.toLowerCase()
  );
  //jwt token by cookie
  const payload = {
    user_id: user.user_id,
    email: user.email,
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
    photo,
    birth_date,
  } = req.body;

  let food_allergies,
    workout_preferences,
    weight,
    height,
    goal,
    experience_years,
    client_limit,
    title,
    certificate_photo,
    description,
    date_issued;
  if (type === "Trainee") {
    ({ food_allergies, workout_preferences, weight, height, goal } = req.body);
  } else {
    ({
      experience_years,
      client_limit,
      title,
      certificate_photo,
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
    photo,
    birth_date,
  ];
  type === "Trainee"
    ? values.push(food_allergies, weight, height, goal, workout_preferences)
    : values.push(
        experience_years,
        client_limit,
        title,
        certificate_photo,
        description,
        date_issued
      );
  const userId = await userModel.AddUser(values);

  //jwt token by cookie
  const payload = {
    user_id: userId,
    email: email,
    type: type,
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

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const {
    email,
    first_name,
    last_name,
    password,
    oldPassword,
    newPassword,
    bio,
    phone_number,
    type,
    photo,
  } = req.body;

  let food_allergies,
    workout_preferences,
    weight,
    height,
    goal,
    experience_years,
    client_limit;
  if (type === "Trainee") {
    ({ food_allergies, workout_preferences, weight, height, goal } = req.body);
  } else if(type === "Trainer") {
    ({ experience_years, client_limit } = req.body);
  }

  if (!validator.isEmail(email))
    return next(new AppError("Please enter a valid Email", 400));

  if (oldPassword && !(await validatePassword(oldPassword, password)))
    return next(new AppError("Incorrect password", 401));
  const passwordHashed = oldPassword
    ? await hashPassword(newPassword)
    : password;

  const values = [
    email,
    first_name,
    last_name,
    passwordHashed,
    bio,
    phone_number,
    photo,
    type,
    userId,
  ];
  type === "Trainee"
    ? values.push(food_allergies, weight, height, goal, workout_preferences)
    : type === "Trainer"? values.push(experience_years, client_limit): values;

  const user = await userModel.updateUser(values);

  res.status(200).json({
    status: "success",
    user: user,
  });
};

//Create Account for Admin only

const createAccount = async (req, res, next) => {
  const {
    email,
    first_name,
    last_name,
    password,
    gender,
    bio,
    phone_number,
    type,
    photo,
    birth_date,
  } = req.body;

  let food_allergies,
    workout_preferences,
    weight,
    height,
    goal,
    experience_years,
    client_limit,
    title,
    certificate_photo,
    description,
    date_issued;
  if (type === "Trainee") {
    ({ food_allergies, workout_preferences, weight, height, goal } = req.body);
  } else if (type === "Trainer") {
    ({
      experience_years,
      client_limit,
      title,
      certificate_photo,
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
    photo,
    birth_date,
  ];

  if (type === "Trainee") {
    values.push(food_allergies, weight, height, goal, workout_preferences);
  } else if (type === "Trainer") {
    values.push(
      experience_years,
      client_limit,
      title,
      certificate_photo,
      description,
      date_issued
    );
  }

  const userId = await userModel.AddUser(values);

  res.status(200).json({
    status: "success",
    data: {
      userId,
    },
  });
};

// Log-out => Reset Cookie

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/users");
};

module.exports = {
  getUserById,
  checkAuth,
  login: catchAsync(login),
  signup: catchAsync(signup),
  updateUser: catchAsync(updateUser),
  createAccount: catchAsync(createAccount),
  logout,
};
