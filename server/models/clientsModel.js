const db = require("../db")
const AppError = require("../utils/AppError");

exports.getAllClients = async (coachId) => {
    console.log("hello")
    const query = `SELECT t.trainee_id, u.first_name, u.last_name, p.package_name FROM lifta_schema.trainee t JOIN lifta_schema.users u ON t.trainee_id = u.user_id JOIN lifta_schema.subscription s ON t.trainee_id = s.trainee_id JOIN lifta_schema.package p ON s.package_id = p.package_id WHERE t.coach_id = $1`;
    return (await db.query(query, [coachId] )).rows;
}