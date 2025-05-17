import { serve } from "@hono/node-server";
import { drizzle } from "drizzle-orm/postgres-js";
import { Hono } from "hono";
import postgres from "postgres";
import { env } from "../env";
import type { DrizzleClient } from "./db";
import { userExists } from "./packages/domain/user/service/user-exists";
import {
  selectUserByIdQuery,
  selectUserByNameQuery,
  updateUserCommand,
} from "./packages/infrastructure/user";
import { updateUser } from "./packages/use-case/user/update-user";

const app = new Hono<{ Variables: { db: DrizzleClient } }>()
  .use(async (c, next) => {
    c.set("db", drizzle({ client: postgres(env.DATABASE_URL) }));
    await next();
  })
  .get("/db", (c) => {
    return updateUser(
      selectUserByIdQuery(c.get("db")),
      userExists(selectUserByNameQuery(c.get("db"))),
      updateUserCommand(c.get("db")),
    )("01966267-cd4a-71e6-8e52-81fe463d0b5f", "hoge").match(
      (value) => c.json(value),
      (error) => c.json(error),
    );
  })
  .get("/tx", async (c) => {
    return c
      .get("db")
      .transaction((tx) =>
        updateUser(
          selectUserByIdQuery(tx),
          userExists(selectUserByNameQuery(tx)),
          updateUserCommand(tx),
        )("01966267-cd4a-71e6-8e52-81fe463d0b5f", "hoge").match(
          (value) => c.json(value),
          (error) => {
            throw error;
          },
        ),
      )
      .catch((error) => c.json(error));
  });

serve(app);
