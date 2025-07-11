import { FoodOptions } from "@/types";
import { createContext } from "react";

export const MealContext = createContext({
  enabled: true,
  foodOptions: {
    starter: [],
    main: [],
    dessert: [],
  },
} as {
  enabled: boolean;
  foodOptions: FoodOptions;
});
