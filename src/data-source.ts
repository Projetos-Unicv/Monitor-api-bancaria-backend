import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Bank } from "./server/shared/database/entities/Bank";
// import { Record } from "./server/shared/database/entities/Record";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // Desative synchronize para gerar migrações corretamente
  // entities: [`${__dirname}+server/shared/database/entities/Bank.{ts,js}`],
  entities: [`${__dirname}/server/shared/database/entities/*.{ts,js}`],
  migrations: [`${__dirname}/server/shared/database/migrations/*.{ts,js}`],
  migrationsTableName: "Migrations",
  // logging: true, // Habilite o logging para depuração, se necessário
});
