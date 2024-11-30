const jwt = require("jsonwebtoken");


const createToken = payload => {
    return jwt.sign(payload, process.env.SECRETKEY);
  }

  module.exports = createToken