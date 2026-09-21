// db.ts — PostgreSQL
import ORMManager from 'slintorm';

export const orm = new ORMManager({
  driver: 'postgres',
  databaseUrl: process.env.DATABASE_URL!, // postgresql://user:pass@host/db
  dir: './src',
});

await orm.migrate();