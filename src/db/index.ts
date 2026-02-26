import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

//importing all tables as schema and sends to db (so it will know what schema are we using)
import * as schema from "./schema.ts";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});
