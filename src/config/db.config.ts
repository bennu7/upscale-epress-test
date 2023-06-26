import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import { logger } from "../helper/logger.helper";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER_NAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: (process.env.DB_DIALECT as any) || "mysql",
    port: process.env.DB_PORT as unknown as number,
    logging: true,
  }
);

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log(
      `\t -- GOOD BOY THIS DB ${process.env.DB_DIALECT} CONNECTED! 🫡 🫡 --`
    );
  } catch (err) {
    console.log(
      `\n\n\t === 😖 ERROR CONNECTING DB ${process.env.DB_DIALECT} 😖 === `
    );
    console.log("DETAIL => ", err);
    logger.error(`BUG CONFIG DB : ${err}`);

    // process.exit();
  }
};

const DB = {
  sequelize,
  connectDB,
};

export default DB;
