const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const sendError = (res, err) => {
  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  console.log(err.statusCode);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendError(res, err);
  //in production, if not operational, we will send a generic error message
};
