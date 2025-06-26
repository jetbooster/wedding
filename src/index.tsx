import { serve } from "bun";
import index from "./index.html";
import { Database } from "bun:sqlite";
import { User, UserResponse } from "./types";

const db = new Database("./db/db.sqlite");

db.exec("PRAGMA journal_mode = WAL;");

db.run(`DROP TABLE IF EXISTS food;`);

db.run(`
  CREATE TABLE food (
    food_id INTEGER PRIMARY KEY,
    description TEXT
  );`)

const insertFood = db.prepare(`INSERT INTO food (description) VALUES ($desc)`);

const insertFoods = db.transaction(foods=>{
  for (const food of foods) insertFood.run(food);
});

insertFoods([
  {$desc: 'Yummy Yummy Gravy'},
  {$desc: 'Yummy Yummy Chicken'},
  {$desc: 'Yummy Yummy Beef'},
]);

db.run(`
  CREATE TABLE IF NOT EXISTS 'users'(
    user_id INTEGER PRIMARY KEY,
    user_code TEXT NOT NULL,
    user_primary_name TEXT NOT NULL,
    user_allowed_partner INTEGER,
    user_partner_name TEXT
  )  
`);

db.run(
  `
  CREATE TABLE IF NOT EXISTS 'responses'(
    response_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    attending INTEGER NOT NULL,
    meal_selection INTEGER NOT NULL,
    partner_name TEXT,
    partner_meal_selection INTEGER,
    children INTEGER NOT NULL,
    notes TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE
  );
`
);

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/submit": {
      async POST(req: Bun.BunRequest) {
        const { searchParams } = new URL(req.url);

        const userCode = searchParams.get("user_code");
        if (!userCode) {
          return new Response(
            "No user_code query param provided. Ensure you entered the whole URL you were provided",
            {
              status: 401,
              headers: { "Content-Type": "text/plain" },
            }
          );
        }

        const user = (await (
          await fetch(`/api/get_user/${userCode}`)
        ).json()) as User | undefined;

        if (!user) {
          return new Response(
            "user does not exist. Ensure you entered the whole URL you were provided",
            {
              status: 404,
              headers: { "Content-Type": "text/plain" },
            }
          );
        }

        const {
          name,
          attending,
          meal_selection,
          partner_name,
          partner_meal_selection,
          children,
          notes,
        } = (await req.json()) as UserResponse;

        return new Response(db.query(
          `
          INSERT INTO responses (name,attending,meal_selection,partner_name,partner_meal_selection,children,notes,user_id)
          VALUES (?1,?2,?3,?4,?5,?6,?7,?8);
          `
        ).get(
          name,
          attending,
          meal_selection,
          partner_name,
          partner_meal_selection,
          children,
          notes,
          user.user_id
        ) as string);

      },
    },

    "/api/get_user/:user_code": async (req) => {
      const result = db
        .query("SELECT * FROM users WHERE user_code=$user_code")
        .get({
          $user_code: req.params.user_code,
        }) as User;
      if (!result) {
        return new Response(
          "user_code does not exist. Ensure you entered the whole URL you were provided",
          {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          }
        );
      }
      return Response.json(result);
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
