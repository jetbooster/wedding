import { serve } from "bun";
import index from "./index.html";
import { Database } from "bun:sqlite";
import {
  DatabaseResponse,
  FoodOption,
  FormResponse,
  User,
  UserResponse,
} from "./types";
import initialise_db from "db/initialise_db";
import { getAllResponses } from "db/admin_functions";

const db = new Database("./db/db.sqlite");

const getUser = (code: string) => {
  const result = db
    .query("SELECT * FROM users WHERE code=$code OR user_id=$code")
    .get({
      $code: code,
    }) as User;
  if (!result) {
    return ObjResp({ error: "user_code does not exist" }, 404);
  }
  return result;
};

const ObjResp = (
  r: Record<string, unknown>,
  status: number = 200,
  headers = {},
) => {
  return new Response(JSON.stringify(r), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};
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

    "/api/query_user": {
      async POST(req: Bun.BunRequest) {
        const { first, last }: { first?: string; last?: string } =
          await req.json();
        if (!first || !last) {
          return ObjResp(
            { error: "Please provide both first and last name." },
            400,
          );
        }
        const name = `${first.trim()} ${last.trim()}`;
        const result = db
          .query("SELECT * FROM users WHERE name=$name OR partner_name=$name")
          .get({
            $name: name,
          }) as User | null;

        if (!result) {
          return ObjResp(
            {
              error:
                "User does not exist. Ensure you used your full name, otherwise try your partner's name. If that doesn't work, contact us.",
            },
            404,
          );
        }
        return Response.json(result);
      },
    },

    "/api/submit": {
      async POST(req: Bun.BunRequest) {
        const userId = req.headers.get("user-id");

        if (!userId) {
          return ObjResp(
            {
              error:
                "No user_code query param provided. Ensure you entered the whole URL you were provided",
            },
            401,
          );
        }

        const user = getUser(userId);

        if (!user || user instanceof Response) {
          return ObjResp(
            {
              error:
                "user does not exist. Ensure you entered the whole URL you were provided",
            },
            403,
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
          dietry_reqs,
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
          INSERT OR REPLACE INTO responses (user_id, attending, partner_attending, children, dietry_reqs, notes)
          VALUES (
            ?,
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
            dietry_reqs || "",
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
          const result = await submit();
          console.log(result);
          return ObjResp({
            success: true,
            message: "Response submitted successfully",
          });
        } catch (error) {
          console.error("Error updating user or response:", error);
          return ObjResp({ error: error }, 500);
        }
      },
    },

    "/api/get_user/:code": async (
      req: Bun.BunRequest<"/api/get_user/:code">,
    ) => {
      return Response.json(getUser(req.params.code));
    },
    "/api/submission": async (req: Bun.BunRequest<"/api/submission">) => {
      const { searchParams } = new URL(req.url);
      const submissionExists = db
        .query("SELECT * FROM responses WHERE user_id = $userId")
        .get({ $userId: searchParams.get("id") }) as FormResponse;
      const result = db
        .query(
          `
          SELECT
            u.user_id as user_id,
            u.name as name,
            resp.attending as attending,
            resp.partner_attending as partner_attending,
            u.partner_name as partner_name,
            f.food_id as food_id,
            mc.for_partner as for_partner,
            mc.meal_type as meal_type,
            resp.children as children,
            resp.dietry_reqs as dietry_reqs,
            resp.notes as notes
          FROM responses resp 
            natural join meal_choices mc
            natural join users u
            natural join food f    
          WHERE user_id = $userId;`,
        )
        .all({ $userId: searchParams.get("id") }) as DatabaseResponse[];

      if (!result || result.length === 0) {
        if (submissionExists) {
          return Response.json({
            name: submissionExists.name,
            attending: Boolean(submissionExists.attending),
            partner_attending: Boolean(submissionExists.partner_attending),
            partner_name: submissionExists.partner_name,
            mealChoice: {
              starter: -1,
              main: -1,
              dessert: -1,
            },
            partnerMealChoice: {
              starter: -1,
              main: -1,
              dessert: -1,
            },
            dietryReqs: submissionExists.dietry_reqs,
            children: submissionExists.children,
            notes: submissionExists.notes,
          });
        }
        return ObjResp({}, 404);
      }

      const mergedResult = Object.values(
        result.reduce(
          (acc, row) => {
            const userId = row.user_id;
            if (!acc[userId]) {
              acc[userId] = {
                name: row.name,
                attending: Boolean(row.attending),
                partner_attending: Boolean(row.partner_attending),
                partner_name: row.partner_name,
                mealChoice: {
                  starter: -1,
                  main: -1,
                  dessert: -1,
                },
                partnerMealChoice: {
                  starter: -1,
                  main: -1,
                  dessert: -1,
                },
                dietryReqs: row.dietry_reqs,
                children: row.children,
                notes: row.notes,
              };
            }
            if (row.for_partner) {
              acc[userId].partnerMealChoice[row.meal_type] = row.food_id;
            } else {
              acc[userId].mealChoice[row.meal_type] = row.food_id;
            }
            return acc;
          },
          {} as Record<number, UserResponse>,
        ),
      );

      return Response.json(mergedResult[0]);
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
