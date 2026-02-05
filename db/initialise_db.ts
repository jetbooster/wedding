import { Database } from "bun:sqlite";

export default (db: Database) => {
  db.exec("PRAGMA journal_mode = WAL;");

  db.run("DROP TABLE IF EXISTS 'food'");

  db.run(`
  CREATE TABLE IF NOT EXISTS 'food' (
    food_id INTEGER PRIMARY KEY,
    description TEXT,
    type TEXT CHECK (type IN ('starter', 'main', 'dessert')),
    UNIQUE (description, type)
  );`);

  db.run(`
  CREATE TABLE IF NOT EXISTS 'users'(
    user_id INTEGER PRIMARY KEY,
    code TEXT UNIQUE,
    name TEXT NOT NULL,
    allowed_partner INTEGER,
    partner_name TEXT,
    address TEXT
  )  
`);

  db.run(
    `
  CREATE TABLE IF NOT EXISTS 'responses'(
    response_id INTEGER PRIMARY KEY,
    attending INTEGER NOT NULL,
    partner_attending INTEGER,
    children TEXT NOT NULL,
    dietry_reqs TEXT,
    notes TEXT,
    user_id INTEGER UNIQUE,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE
  );
`,
  );

  db.run(`
  CREATE TABLE IF NOT EXISTS 'meal_choices'(
    for_partner INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    meal_type TEXT NOT NULL,
    food_id INTEGER NOT NULL,
    PRIMARY KEY (for_partner, user_id, meal_type),
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (food_id)
      REFERENCES food(food_id)
        ON UPDATE CASCADE
  );
    `);

  const insertFood = db.prepare(
    `INSERT INTO food (description,type) VALUES ($desc,$type) ON CONFLICT(description, type) DO NOTHING`,
  );

  const insertFoods = db.transaction((foods) => {
    for (const food of foods) insertFood.run(food);
  });

  insertFoods([
    { $desc: "Yummy Yummy Gravy", $type: "starter" },
    { $desc: "Yummy Yummy Soup", $type: "starter" },
    { $desc: "Yummy Yummy Salad", $type: "starter" },
    { $desc: "Yummy Yummy Chicken", $type: "main" },
    { $desc: "Yummy Yummy Beef", $type: "main" },
    { $desc: "Yummy Yummy Vegan", $type: "main" },
    { $desc: "Yummy Yummy Chocolate", $type: "dessert" },
    { $desc: "Yummy Yummy Cheesecake", $type: "dessert" },
  ]);

};
