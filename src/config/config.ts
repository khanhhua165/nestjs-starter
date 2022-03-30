require('dotenv').config();

export const db = {
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
};
