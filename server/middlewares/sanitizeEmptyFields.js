const sanitizeEmptyFields = (req, res, next) => {
  Object.keys(req).forEach((key) => {
    if (req[key] === "") {
      req[key] = null;
    }
  });
  next();
};

module.exports = sanitizeEmptyFields;
