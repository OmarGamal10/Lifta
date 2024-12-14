const db = require("../db");

exports.getAllUsers = async () => {
  const query = "SELECT * FROM lifta_schema.users";
  return (await db.query(query)).rows;
};

exports.getAllTrainees = async () => {
  const query = "SELECT * FROM lifta_schema.users INNER JOIN lifta_schema.trainee ON user_id = trainee_id";
  return (await db.query(query)).rows;
};

exports.getAllCoaches = async () => {
  const query = "SELECT * FROM lifta_schema.users INNER JOIN lifta_schema.trainer ON user_id = trainer_id";
  return (await db.query(query)).rows;
};

exports.SelectUserById = async (Id) => {
  const query = "SELECT * FROM lifta_schema.users WHERE user_id = $1";
  const values = [Id];
  return (await db.query(query, values)).rows[0];
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
  const userValues = values.slice(0, 8);
  const rest = values.slice(8);
  const query =
    "INSERT INTO lifta_schema.users (email, first_name, last_name, password, gender, bio, phone_number, type)VAlUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING user_id";
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

exports.assignToTrainer = async (s_id) => {
  const query = `
    UPDATE lifta_schema.trainee t
    SET 
        coach_id = CASE 
            WHEN p.type IN ('Gym', 'Both') THEN p.trainer_id 
            ELSE coach_id 
        END,
        nutritionist_id = CASE 
            WHEN p.type IN ('Nutrition', 'Both') THEN p.trainer_id 
            ELSE nutritionist_id 
        END
    FROM lifta_schema.subscription s
    JOIN lifta_schema.package p
    ON s.package_id = p.package_id
    WHERE t.trainee_id = s.trainee_id
    AND s.subscription_id = $1;`;

  const value = s_id;

  await db.query(query, value);
};

exports.getAvailableCoaches = async () => {
  const query = `SELECT c.trainer_id, 
       u.first_name, 
       u.last_name, 
       c.experience_years, 
       c.rating
FROM lifta_schema.trainer c
JOIN lifta_schema.users u ON u.user_id = c.trainer_id
LEFT JOIN lifta_schema.trainee t 
    ON t.coach_id = c.trainer_id OR t.nutritionist_id = c.trainer_id
GROUP BY c.trainer_id, u.first_name, u.last_name, c.experience_years, c.rating, c.client_limit
HAVING c.client_limit > COUNT(DISTINCT CASE WHEN t.coach_id = c.trainer_id OR t.nutritionist_id = c.trainer_id THEN t.trainee_id END);
`;

  return (await db.query(query)).rows;
};
