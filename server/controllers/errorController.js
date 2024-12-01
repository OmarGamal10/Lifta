const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const AppError = require("../utils/AppError");

const sendError = (res, err) => {
  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  console.log(err.statusCode);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendError(res, err);
  //in production, if not operational, we will send a generic error message
};

// for production to send meaningful error messages
const handleDuplicateKeyError = (err) => {
  //for code 23505
  const message = `This value already exists. Please use another value!`;
  return new AppError(message, 400);
};
