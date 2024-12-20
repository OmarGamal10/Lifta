const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const coach = require("../models/clientsModel");

const getAllClients = async (req, res, next) => {
        const { coachId } = req.params;
        if(!coachId || isNaN(coachId)) {
            return next(new AppError("please provide a coach id"), 400);
        }

        const clients = await coach.getAllClients(coachId);
        res.status(200).json({
            status: "success",
            data: {
                clients,
            }
        });
};

const removeClient = async (req, res, next) => {
    const { traineeId, packageId } = req.params;
    const dummy = await coach.removeClient(traineeId, packageId);
    res.status(200).json({
        status: "success",
    })
}
module.exports = {
    getAllClients: catchAsync(getAllClients),
   removeClient: catchAsync(removeClient),
};