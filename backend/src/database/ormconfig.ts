import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import path = require('path');
import dotenv = require('dotenv');

dotenv.config({
  path: path.join(`./.env.${process.env.NODE_ENV}`),
});

const ormConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['./dist/../**/*.entity.js'],
  migrations: ['./dist/database/migrations/*.js'],
  migrationsRun: false,
};

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['./src/../**/*.entity.ts'],
  migrations: ['./src/database/migrations/*.ts'],
});

export const ormConfigNest = ormConfig as TypeOrmModuleOptions;
export default dataSource;
