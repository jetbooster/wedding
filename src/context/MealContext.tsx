import { FoodOptions } from "@/types";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const defaultMealOptions: FoodOptions = {
  starter: [],
  main: [],
  dessert: [],
};

export const MealContext = createContext<{
  mealOptions: FoodOptions;
  setMealOptions: Dispatch<SetStateAction<FoodOptions>>;
}>({ mealOptions: defaultMealOptions, setMealOptions: () => {} });

export const MealProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mealOptions, setMealOptions] = useState(defaultMealOptions);

  useEffect(() => {
    fetch("/api/get_food")
      .then((result) => result.json())
      .then((result) => {
        setMealOptions({
          starter: result.starter,
          main: result.main,
          dessert: result.dessert,
        });
      });
  }, []);

  return (
    <MealContext.Provider value={{ mealOptions, setMealOptions }}>
      {children}
    </MealContext.Provider>
  );
};
