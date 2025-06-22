import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: uuid().primaryKey(),
  name: text().notNull().unique(),
});

export type UserDataModel = typeof usersTable.$inferSelect;
