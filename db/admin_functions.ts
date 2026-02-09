import { DatabaseResponse, UserResponse } from "@/types";
import { Database } from "bun:sqlite";

const thisFolder = import.meta.dir;

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
    f.description_en as food_description_en,
    f.description_fr as food_description_fr,
    f.food_id as food_id,
    mc.for_partner as for_partner,
    mc.meal_type as meal_type,
    resp.children as children,
    resp.notes as notes
  FROM responses resp 
    natural join meal_choices mc
    natural join users u
    natural join food f    
  WHERE resp.attending = 1;`,
    )
    .all() as DatabaseResponse[];

  return Object.values(
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
            mealChoiceString: {
              starter: "",
              main: "",
              dessert: "",
            },
            partnerMealChoice: {
              starter: -1,
              main: -1,
              dessert: -1,
            },
            partnerMealChoiceString: {
              starter: "",
              main: "",
              dessert: "",
            },
            dietryReqs: row.dietry_reqs,
            children: row.children,
            notes: row.notes,
          };
        }
        if (row.for_partner) {
          acc[userId].partnerMealChoiceString[row.meal_type] =
            row.food_description_en;
          acc[userId].partnerMealChoice[row.meal_type] = row.food_id;
        } else {
          acc[userId].mealChoiceString[row.meal_type] = row.food_description_en;
          acc[userId].mealChoice[row.meal_type] = row.food_id;
        }
        return acc;
      },
      {} as Record<number, UserResponse>,
    ),
  );
};

if (import.meta.path === Bun.main) {
  const db = new Database(`${thisFolder}/db.sqlite`);
  const responses = getAllResponses(db);
  console.log(responses);
  db.close();
}
