import { ChildMealChoice, FormErrors, MealChoice } from "./types";

export const BLANK_MEAL_CHOICE: MealChoice = {
  starter: -1,
  main: -1,
  dessert: -1,
};
export const BLANK_MEAL_ERRORS: FormErrors["mealChoice"] = {
  starter: false,
  main: false,
  dessert: false,
};
export const BLANK_CHILD_MEAL_CHOICE: ChildMealChoice = {
  name: "",
  needsHighChair: false,
  bringOwnFood: false,
};