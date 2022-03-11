import seq from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new seq.Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DILECT,
  logging: false,
  // Storage: ":memory"
});
