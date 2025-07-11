import { Database } from "bun:sqlite";

const thisFolder = import.meta.dir;

type MealType = "starter" | "main" | "dessert";

type MealChoice = Record<MealType, string>;

interface UserResponse {
  name: string;
  attending: boolean,
  partner_attending: boolean,
  partner_name: string;
  mealChoice: Partial<MealChoice>;
  partnerMealChoice: Partial<MealChoice>;
  children: number;
  notes: string;
}

interface DatabaseResponse {
  user_id: number;
  name: string;
  attending: string;
  partner_attending: string;
  partner_name: string;
  food_description: string;
  for_partner: boolean;
  meal_type: MealType;
  children: number;
  notes: string;
}

export const getAllResponses = (db: Database) => {
  const result = db
    .query(
      `
  SELECT
    u.user_id as user_id,
    u.name as name,
    resp.attending as attending,
    resp.partner_attending as partner_attending,
    u.partner_name as partner_name,
    f.description as food_description,
    mc.for_partner as for_partner,
    mc.meal_type as meal_type,
    resp.children as children,
    resp.notes as notes
  FROM responses resp 
    natural join meal_choices mc
    natural join users u
    natural join food f    
  WHERE resp.attending = 1;`
    )
    .all() as DatabaseResponse[];

  return Object.values(
    result.reduce((acc, row) => {
      const userId = row.user_id;
      if (!acc[userId]) {
        acc[userId] = {
          name: row.name,
          attending: Boolean(row.attending),
          partner_attending: Boolean(row.partner_attending),
          partner_name: row.partner_name,
          mealChoice: {},
          partnerMealChoice: {},
          children: row.children,
          notes: row.notes,
        };
      }
      if (row.for_partner) {
        acc[userId].partnerMealChoice[row.meal_type] = row.food_description;
      } else {
        acc[userId].mealChoice[row.meal_type] = row.food_description;
      }
      return acc;
    }, {} as Record<number, UserResponse>)
  );
};

if (import.meta.path === Bun.main) {
  const db = new Database(`${thisFolder}/db.sqlite`);
  const responses = getAllResponses(db);
  console.log(responses);
  db.close();
}
