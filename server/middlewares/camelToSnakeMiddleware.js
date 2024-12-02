const lodash = require("lodash");

const convertToSnakeCase = (req, res, next) => {
  if (req.body) {
    req.body = lodash.mapKeys(req.body, (value, key) => lodash.snakeCase(key));
  }
  next();
};

module.exports = convertToSnakeCase;
