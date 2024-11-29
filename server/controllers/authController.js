//any helper functions in the utils folder
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const validator = require("validator");
//const db = require(".././db");
const AppError = require("../utils/AppError");
const { hashPassword, validatePassword } = require("../utils/hashPassword");
const createToken = require("../utils/createToken");
const DBcontroller = require("../db/DBController");

// Log-In
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email))
      return next(new AppError("Please enter a valid Email", 400));

    // const user = await db.query(
    //   "SELECT * FROM lifta_schema.users WHERE email = $1",
    //   [email]
    // );
    
    const user = await DBcontroller.SelectUserByEmail(email);

    if (!user) return next(new AppError("User not found", 404));

    if (!(await validatePassword(user.rows[0]["password"], await hashPassword(password))))
      return next(new AppError("Incorrect password", 401));

    // if (password != user.rows[0].password)
    //   return next(new AppError("Incorrect password", 401));

    //jwt token by cookie
    const payload = {
      "user_id": user.rows[0]["user_id"],
      "email": user.rows[0]["email"],
      "phone_number": user.rows[0]["phone_number"]
    }

    const token = createToken(payload);
    res.cookie('jwt', token);

    
    res.status(200).json({
      status: "success",
      data: {
        user: user.rows[0],
        "token": JSON.parse(atob(token.split('.')[1]))
      },
    });
  } catch (error) {
    console.error("Error finding user by email:", error);
    next(error);
  }
};

// Sign-Up

exports.signup = async (req, res, next) => {
  try {
    const {email, first_name, last_name,password, gender, bio, phone_number} = req.body;

    if (!validator.isEmail(email))
      return next(new AppError("Please enter a valid Email", 400));

    // const count = await db.query(
    //   "SELECT COUNT(*) FROM lifta_schema.users WHERE email = $1;",
    //   [email]
    // );

    // console.log(parseInt(count.rows[0].count, 10))
    // if(parseInt(count.rows[0].count, 10) > 0)
    //     return next(new AppError("Duplicate Email"), 400)

    // await db.query(
    //   "INSERT INTO lifta_schema.users (user_id, email, first_name, last_name, password, gender, bio, phone_number)VAlUES($1,$2, $3, $4, $5, $6, $7, $8)",
    //   [user_id, email, first_name, last_name, hashPassword(password), gender, bio, phone_number]
    // )

    const values = [email, first_name, last_name,password, gender, bio, phone_number];
    await DBcontroller.AddUser(values);
    
    
    //jwt token by cookie
    const payload = {
      "email": email,
      "phone_number": phone_number
    }

    const token = createToken(payload);
    res.cookie('jwt', token);



    res.status(200).json({
      status: "success",
      data: {
        "token": JSON.parse(atob(token.split('.')[1]))
      },
    });
    

  } catch (error) {
    console.error("Error Creating user:", error);
    next(error);
  }
}

