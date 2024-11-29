const db = require("../db");
const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/", async (req, res, next) => {
  //return next(new AppError("This is a fkn err", 400));
  const results = await db.query("SELECT * FROM lifta_schema.users");
  res.status(200).json({
    status: "success",
    message: "Welcome to the Lifta API",
    data: {
      users: results.rows,
    },
  });
});

router.post("/login", authController.login);
router.post("/signup", authController.signup);
// router.get("/hello", requireAuth.requireAuth, (req, res) => {
//   res.send(`Welcome, ${req.user.username}!`)});
module.exports = router;
