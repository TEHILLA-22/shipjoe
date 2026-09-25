import ORMManager from "slintorm";
import type { Admin, Quote } from "./models";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured.");
}

const orm = new ORMManager({
  driver: "postgres",
  databaseUrl,
  dir: "src",
  logs: process.env.NODE_ENV !== "production",
});

export const Quotes = await orm.defineModel<Quote>(
  "quotes",
  "Quote",
);

export const Admins = await orm.defineModel<Admin>(
  "admins",
  "Admin",
);

export { orm };
