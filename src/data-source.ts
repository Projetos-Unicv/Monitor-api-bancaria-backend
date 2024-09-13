import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Bank } from "./server/shared/database/entities/Bank";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // Somente para desenvolvimento. Não use em produção!
  entities: [Bank],

  //   logging: true,
  //   subscribers: [],
  //   migrations: [],
});
