const router = require("express").Router();
const coachController = require("../controllers/clientsController");

router.get("/", (req, res, next) => {
    console.log("hello from coachRoute")
    return coachController.getAllClients(req, res, next);
})

module.exports = router;