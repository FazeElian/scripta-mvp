import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
export const db = new Sequelize (process.env.DATABASE_URL, {
    models: [__dirname + "/../models/**/*"],
    logging: false,
    dialect: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
})