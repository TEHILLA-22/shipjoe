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

const FLOAT_COLUMNS = [{ table: "quotes", column: "weight" }] as const;

let columnTypesVerified = false;

async function ensureFloatingColumns(): Promise<void> {
  if (columnTypesVerified) return;
  try {
    let verified = true;
    for (const { table, column } of FLOAT_COLUMNS) {
      const found = await orm.execRaw(
        `SELECT data_type FROM information_schema.columns WHERE table_name = '${table}' AND column_name = '${column}'`,
      );
      const dataType: string | undefined = found?.rows?.[0]?.data_type;
      if (!dataType) {
        verified = false;
        continue;
      }
      if (dataType !== "double precision") {
        await orm.execRaw(
          `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE double precision USING "${column}"::double precision`,
        );
      }
    }
    columnTypesVerified = verified;
  } catch {
    // Best effort — retried by the insert hook so a boot-time failure is never fatal.
  }
}

await ensureFloatingColumns();

export const Quotes = await orm.defineModel<Quote>(
  "quotes",
  "Quote",
  {
    onCreateBefore: async () => {
      await ensureFloatingColumns();
    },
  },
);

export const Admins = await orm.defineModel<Admin>(
  "admins",
  "Admin",
);

export { orm };
