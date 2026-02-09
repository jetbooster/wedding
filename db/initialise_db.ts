import { Database } from "bun:sqlite";

export default (db: Database) => {
  db.exec("PRAGMA journal_mode = WAL;");

  db.run("DROP TABLE IF EXISTS 'food'");

  db.run(`
  CREATE TABLE IF NOT EXISTS 'food' (
    food_id INTEGER PRIMARY KEY,
    description_en TEXT,
    description_fr TEXT,
    type TEXT CHECK (type IN ('starter', 'main', 'dessert')),
    UNIQUE (description_en, type)
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
    `INSERT INTO food (description_en,description_fr,type) VALUES ($desc_en,$desc_fr,$type) ON CONFLICT(description_en, type) DO NOTHING`,
  );

  const insertFoods = db.transaction((foods) => {
    for (const food of foods) insertFood.run(food);
  });

  insertFoods([
    { $desc_fr:"",$desc_en: "Ham hock croquette with apple puree, celeriac and apple slaw, and micro leaf salad", $type: "starter" },
    { $desc_fr:"",$desc_en: "Smoked haddock and new potato fishcake with dill and lemon mayonnaise, gem", $type: "starter" },
    { $desc_fr:"",$desc_en: "Roast tomato & red pepper soup with basil and sourdough croutons (Vegan)", $type: "starter" },
    { $desc_fr:"",$desc_en: "Slow cooked beef shin with buttered chive mash, confit carrot, tender stem broccoli, and bourguignon sauce", $type: "main" },
    { $desc_fr:"",$desc_en: "Baked salmon fillet with anna potatoes, spinach, dill hollandaise and herb oil", $type: "main" },
    { $desc_fr:"",$desc_en: "Wild mushroom and spinach wellington with seasonal potatoes and vegetables, and jus (Vegan)", $type: "main" },
    { $desc_fr:"",$desc_en: "Lemon tart with fresh raspberries and clotted cream", $type: "dessert" },
    { $desc_fr:"",$desc_en: "Baked cheesecake with strawberry compote and a white chocolate soil", $type: "dessert" },
    { $desc_fr:"",$desc_en: "Chocolate brownie with vanilla ice cream (Vegan)", $type: "dessert" },
  ]);

};
