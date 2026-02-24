import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";

export const auth = betterAuth({
  //ORM ADAPTER
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
