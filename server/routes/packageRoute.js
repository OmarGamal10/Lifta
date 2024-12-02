const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const userModel = require("../models/packageModel");

//for testing without opening pgAdmin (getting all users)
router.get("/", async (req, res, next) => {
  const { coachId } = req.params;
  console.log(coachId);
  res.status(200).json({
    status: "success",
    data: {
      packages: await userModel.getPackagesByCoachId(coachId),
    },
  });
});

module.exports = router;
