const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Lifta API",
  });
});

module.exports = router;
