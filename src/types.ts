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

export interface FoodOption {
  description: string;
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
  children: number;
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
