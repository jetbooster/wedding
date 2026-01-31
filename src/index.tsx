import { serve } from "bun";
import index from "./index.html";
import { Database } from "bun:sqlite";
import { FoodOption, FormResponse, User } from "./types";
import initialise_db from "db/initialise_db";
import { getAllResponses } from "db/admin_functions";

const db = new Database("./db/db.sqlite");

initialise_db(db);

console.log(getAllResponses(db));

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/images/:image": async (req: Bun.BunRequest<"/images/:image">) => {
      const imageName = req.params.image;
      const imagePath = `./src/images/${imageName}`;
      try {
        return new Response(await Bun.file(imagePath), {
          headers: { "Content-Type": "image/jpeg" },
        });
      } catch (e) {
        return new Response(`Image not found: ${(e as Error).message}`, {
          status: 404,
        });
      }
    },

    "/api/submit": {
      async POST(req: Bun.BunRequest) {
        const userId = req.headers.get("user-id");

        if (!userId) {
          return new Response(
            "No user_code query param provided. Ensure you entered the whole URL you were provided",
            {
              status: 401,
              headers: { "Content-Type": "text/plain" },
            },
          );
        }

        const user = (await (
          await fetch(`${req.headers.get("host")}/api/get_user/${userId}`)
        ).json()) as User | undefined;

        if (!user) {
          return new Response(
            "user does not exist. Ensure you entered the whole URL you were provided",
            {
              status: 404,
              headers: { "Content-Type": "text/plain" },
            },
          );
        }

        const {
          name,
          attending,
          meal_choice,
          partner_attending,
          partner_name,
          partner_meal_choice,
          children,
          notes,
        } = (await req.json()) as FormResponse;

        const submit = db.transaction(() => {
          db.query(
            `
          UPDATE users
          SET name = ?, partner_name = ?
          WHERE user_id = ?;
          `,
          ).run(name, partner_name, user.user_id);

          db.query(
            `
          INSERT OR REPLACE INTO responses (user_id, attending, partner_attending, children, notes)
          VALUES (
            ?,
            ?,
            ?,
            ?,
            ?)
          ;
          `,
          ).run(
            user.user_id,
            attending ? 1 : 0,
            partner_attending ? 1 : 0,
            children || 0,
            notes || "",
          );
          const insertMealChoices = db.prepare(
            `
          INSERT OR REPLACE INTO meal_choices (for_partner, user_id, meal_type, food_id)
          VALUES (?, ?, ?, ?);
          `,
          );
          if (attending) {
            insertMealChoices.run(
              0,
              user.user_id!,
              "starter",
              meal_choice.starter,
            );
            insertMealChoices.run(0, user.user_id!, "main", meal_choice.main);
            insertMealChoices.run(
              0,
              user.user_id!,
              "dessert",
              meal_choice.dessert,
            );
          } else {
            db.run(`DELETE FROM meal_choices WHERE user_id=?`, [user.user_id]);
          }

          if (partner_attending) {
            insertMealChoices.run(
              1,
              user.user_id!,
              "starter",
              partner_meal_choice.starter,
            );
            insertMealChoices.run(
              1,
              user.user_id!,
              "main",
              partner_meal_choice.main,
            );
            insertMealChoices.run(
              1,
              user.user_id!,
              "dessert",
              partner_meal_choice.dessert,
            );
          } else {
            db.run(
              `DELETE FROM meal_choices WHERE user_id=? AND for_partner=1`,
              [user.user_id],
            );
          }
        });
        try {
          submit();
          return new Response("Response submitted successfully", {
            status: 200,
            headers: { "Content-Type": "text/plain" },
          });
        } catch (error) {
          console.error("Error updating user or response:", error);
          return new Response("Error updating user or response", {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          });
        }
      },
    },

    "/api/get_user/:code": async (
      req: Bun.BunRequest<"/api/get_user/:code">,
    ) => {
      const result = db
        .query("SELECT * FROM users WHERE code=$code OR user_id=$code")
        .get({
          $code: req.params.code,
        }) as User;
      if (!result) {
        return new Response(
          "user_code does not exist. Ensure you entered the whole URL you were provided",
          {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          },
        );
      }
      return Response.json(result);
    },

    "/api/get_food": async () => {
      const result = db.query(`SELECT * FROM food;`).all() as {
        type: string;
        description: string;
        food_id: number;
      }[];

      const foodOptions = {
        starter: result.filter(
          (item) => item.type === "starter",
        ) as FoodOption[],
        main: result.filter((item) => item.type === "main") as FoodOption[],
        dessert: result.filter(
          (item) => item.type === "dessert",
        ) as FoodOption[],
      };

      return Response.json(foodOptions);
    },
  },
  error(error) {
    return new Response(error.message);
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
  tls: {
    key: Bun.file("/etc/localcerts/localhost.key"),
    cert: Bun.file("/etc/localcerts/localhost.crt"),
  },
});

console.log(`🚀 Server running at ${server.url}`);
