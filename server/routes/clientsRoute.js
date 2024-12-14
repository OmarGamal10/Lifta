const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const coachController = require("../controllers/clientsController");

router.get("/", (req, res, next) => {
    return coachController.getAllClients(req, res, next);
})

module.exports = router;