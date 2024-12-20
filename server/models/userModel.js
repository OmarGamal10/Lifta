const db = require("../db");
const AppError = require("../utils/AppError");

exports.getAllUsers = async () => {
  const query = "SELECT * FROM lifta_schema.users";
  return (await db.query(query)).rows;
};

exports.getAllTrainees = async () => {
  const query = `SELECT u.user_id,u.first_name, u.last_name,u.email,u.phone_number,u.gender,u.is_banned,t.height,t.weight,t.workout_preferences, COUNT(s.subscription_id) as subscriptions FROM lifta_schema.users u
JOIN lifta_schema.trainee t ON user_id = trainee_id
LEFT JOIN lifta_schema.subscription s ON s.trainee_id = t.trainee_id GROUP BY u.user_id,t.trainee_id;`;
  return (await db.query(query)).rows;
};

exports.getAllCoaches = async () => {
  const query = `SELECT u.user_id,u.first_name, u.last_name,u.email,u.phone_number,u.gender,u.is_banned,t.experience_years,ROUND(AVG(r.stars)::numeric, 3) AS rating, COUNT(s.subscription_id) as subscriptions FROM lifta_schema.users u
JOIN lifta_schema.trainer t ON user_id = trainer_id
LEFT JOIN lifta_schema.package p ON p.trainer_id = t.trainer_id
LEFT JOIN lifta_schema.subscription s ON p.package_id = s.package_id
LEFT JOIN lifta_schema.review r ON r.trainer_id = t.trainer_id
GROUP BY u.user_id,t.trainer_id`;
  return (await db.query(query)).rows;
};

exports.getAllAdmins = async () => {
  const query = `SELECT user_id,first_name, last_name,email,phone_number,gender,is_banned FROM lifta_schema.users WHERE type = 'Admin'`;
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
  let id;
  try {
    const type = values[7]; // Get type from the values array
    const userValues = values.slice(0, 10); // Extract first 10 values for user
    const rest = values.slice(10); // Remaining values for other functionality

    const query = `
      INSERT INTO lifta_schema.users 
      (email, first_name, last_name, password, gender, bio, phone_number, type, photo, birth_date) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING user_id;
    `;

    id = (await db.query(query, userValues)).rows[0].user_id;

    if (type === "Trainee") {
      await addTrainee(rest, id);
    } else if (type === "Trainer") {
      await addTrainer(rest, id);
    }
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError(
        "This email is already registered. Please use another email.",
        400
      );
    }
    throw err;
  }

  return id;
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
    "INSERT INTO lifta_schema.certificate (trainer_id, title,photo,description,date_issued) VALUES ($1, $2, $3, $4, $5)";
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

  const value = [s_id];

  await db.query(query, value);
};

exports.getAvailableCoaches = async () => {
  const query = `SELECT c.trainer_id, 
       u.first_name, 
       u.last_name, 
       c.experience_years, 
       c.rating,
	   COUNT(p.package_id) AS package_count
FROM lifta_schema.trainer c
JOIN lifta_schema.users u ON u.user_id = c.trainer_id
JOIN lifta_schema.package p ON p.trainer_id = c.trainer_id
LEFT JOIN lifta_schema.trainee t 
    ON t.coach_id = c.trainer_id OR t.nutritionist_id = c.trainer_id
GROUP BY c.trainer_id, u.first_name, u.last_name, c.experience_years, c.rating, c.client_limit
HAVING c.client_limit > COUNT(DISTINCT CASE WHEN t.coach_id = c.trainer_id OR t.nutritionist_id = c.trainer_id THEN t.trainee_id END);
`;

  return (await db.query(query)).rows;
};
exports.deleteUserByUserId = async (userId) => {
  const query = "DELETE FROM lifta_schema.users WHERE user_id = $1;";
  return (await db.query(query, [userId])).rows;
};

exports.banUser = async (userId) => {
  const query = `UPDATE lifta_schema.users SET is_banned = 'true' WHERE user_id = $1;`;
  return (await db.query(query, [userId])).rows;
};

exports.unbanUser = async (userId) => {
  const query = `UPDATE lifta_schema.users SET is_banned = 'false' WHERE user_id = $1;`;
  return (await db.query(query, [userId])).rows;
};
