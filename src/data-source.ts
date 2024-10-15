import 'dotenv/config';
import { dirname } from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Bank } from './server/shared/database/entities/Bank';
import { Record } from './server/shared/database/entities/Record';
import { ScriptSeeder } from './server/shared/database/script/ScriptSeeder';

const port = process.env.DB_PORT as number | undefined;
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // Desative synchronize para gerar migrações corretamente
  entities: [Bank, Record],
  migrations: [`${__dirname}/server/shared/database/migrations/*.{ts,js}`],
  migrationsTableName: 'Migrations',
  seeds: [ScriptSeeder],
};
export const AppDataSource = new DataSource(options);
