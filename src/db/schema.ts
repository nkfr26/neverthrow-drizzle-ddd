import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: uuid("user_id").primaryKey(),
  name: text("name").notNull().unique(),
});

export type UserDataModel = typeof usersTable.$inferSelect;
