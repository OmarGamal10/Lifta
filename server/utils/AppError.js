class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error"; // 4xx are server fails, 5xx are errors
    this.isOperational = true; //this indicates WE SENT the error to the error handling middleware, meaning the error is operational, something done by the user, like a wrong password, invalid name or whatever, so that we sent a meaningful msg to the frontend
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
