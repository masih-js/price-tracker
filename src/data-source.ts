import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'price_tracker',
  entities: ['src/database/entities/*.ts'], // Ensure correct path to entities
  migrations: ['src/database/migrations/*.ts'], // Path for migrations
  synchronize: false,
  logging: true,
});
