const express = require("express");
const cors = require("cors");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const coachController = require("../controllers/clientsController");

router.get("/", (req, res, next) => {
    return coachController.getAllClients(req, res, next);
})

router.patch("/:traineeId/:packageId", coachController.removeClient)

module.exports = router;