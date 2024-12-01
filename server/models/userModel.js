const db = require("../db");

exports.getAllUsers = async () => {
  const query = "SELECT * FROM lifta_schema.users";
  return (await db.query(query)).rows;
};

exports.SelectUserByEmail = async (email) => {
  const query = "SELECT * FROM lifta_schema.users WHERE email = $1";
  const values = [email];
  return (await db.query(query, values)).rows[0];
};

exports.SelectTraineeOrTrainerById = async (id, type) => {
  const query = `SELECT * FROM lifta_schema.${type} WHERE ${type}_id = $1`;
  const values = [id];
  return (await db.query(query, values)).rows[0];
};

exports.AddUser = async (values) => {
  const type = values[7];
  const userValues = values.slice(0, 7);
  const rest = values.slice(8);
  const query =
    "INSERT INTO lifta_schema.users (email, first_name, last_name, password, gender, bio, phone_number)VAlUES($1, $2, $3, $4, $5, $6, $7) RETURNING user_id";
  const id = (await db.query(query, userValues)).rows[0].user_id;
  if (type === "Trainee") {
    addTrainee(rest, id);
  } else {
    addTrainer(rest, id);
  }
};

const addTrainee = async (values, id) => {
  values.unshift(id);
  const query =
    "INSERT INTO lifta_schema.trainee (trainee_id, food_allergies,weight,height,goal, workout_preferences) VALUES ($1, $2, $3, $4, $5, $6)";
  await db.query(query, values);
};
const addTrainer = async (values, id) => {
  values.unshift(id);
  const trainerValues = values.slice(0, 3);
  const certification = values.slice(3);
  certification.unshift(id);
  const query =
    "INSERT INTO lifta_schema.trainer (trainer_id, experience_years,client_limit) VALUES ($1, $2, $3)";
  const query2 =
    "INSERT INTO lifta_schema.certification (trainer_id, title,photo,description,date_issued) VALUES ($1, $2, $3, $4, $5)";
  await db.query(query, trainerValues);
  await db.query(query2, certification);
};
