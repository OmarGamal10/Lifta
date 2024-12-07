const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-muddy-poetry-a2gsd8ya.eu-central-1.aws.neon.tech",
  database: "Lifta",
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
  keepAlive: true,
});

const connectDb = async () => {
  try {
    await pool.connect(); // Use await to ensure the connection is established
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

const query = (text, params) => pool.query(text, params);

module.exports = { query };

connectDb();
