export interface User {
  user_id: number;
  code: string;
  name: string;
  allowed_partner: number;
  partner_name: string;
}

export interface MealChoice {
  starter: number;
  main: number;
  dessert: number;
}

export interface ChildMealChoice {
  name:string
  needsHighChair:boolean
  bringOwnFood:boolean
}

export interface FoodOption {
  description_en: string;
  description_fr: string;
  type: "starter" | "main" | "dessert";
  food_id: number;
}

export interface FoodOptions {
  starter: FoodOption[];
  main: FoodOption[];
  dessert: FoodOption[];
}

export interface FormResponse {
  name: string;
  attending: boolean;
  partner_attending: boolean;
  partner_name: string;
  meal_choice: MealChoice;
  partner_meal_choice: MealChoice;
  dietry_reqs: string;
  children: ChildMealChoice[];
  notes: string;
}

export interface FormErrors {
  name: boolean;
  partnerName: boolean;
  mealChoice: {
    starter: boolean;
    main: boolean;
    dessert: boolean;
  };
  partnerMealChoice: {
    starter: boolean;
    main: boolean;
    dessert: boolean;
  };
  children: boolean;
}

type MealType = "starter" | "main" | "dessert";

export interface UserResponse {
  name: string;
  attending: boolean,
  partner_attending: boolean,
  partner_name: string;
  mealChoice: Record<MealType, number>;
  mealChoiceString: Record<MealType, string>;
  partnerMealChoice: Record<MealType, number>;
  partnerMealChoiceString: Record<MealType, string>;
  dietryReqs: string;
  children: string;
  notes: string;
}


export interface DatabaseResponse {
  user_id: number;
  name: string;
  attending: string;
  partner_attending: string;
  partner_name: string;
  food_id: number;
  food_description_en: string;
  food_description_fr: string;
  for_partner: boolean;
  dietry_reqs: string;
  meal_type: MealType;
  children: string;
  notes: string;
}

export type MuiToggleHandler<T = string> = (
  event: React.MouseEvent<HTMLElement>,
  value: T,
) => void;