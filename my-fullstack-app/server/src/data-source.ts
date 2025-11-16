import { DataSource } from 'typeorm';
import { User } from './entities/User';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});