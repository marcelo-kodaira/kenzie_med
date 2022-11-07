import { DataSource } from "typeorm";
import "dotenv/config";
import path from "path";
const isProduction = process.env.NODE_ENV === "production";
const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: isProduction
          ? {
              rejectUnauthorized: false,
            }
          : false,
        synchronize: false,
        logging: isProduction ? false : true,

        entities: [path.join(__dirname, "./entities/*.{js,ts}")],
        // process.env.NODE_ENV === "production"
        //   ? ["dist/src/entities/*.js"]
        //   : ["src/entities/*.ts"],
        migrations: [path.join(__dirname, "./migrations/*.{js,ts}")],
        // process.env.NODE_ENV === "production"
        //   ? ["dist/src/migrations/*.js"]
        //   : ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
