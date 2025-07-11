import { MealContext } from "@/context/MealContext";
import { toTitleCase } from "@/utils";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useContext } from "react";
import { OutlinedInput } from "./OutlinedInput";

interface MealSelectorProps {
  partner?: boolean;
  currentMealChoice: {
    starter: number;
    main: number;
    dessert: number;
  };
  mealChoiceErrors: {
    starter: boolean;
    main: boolean;
    dessert: boolean;
  };
  setDirty: Dispatch<SetStateAction<boolean>>;
  changeMealChoice: (
    type: "starter" | "main" | "dessert",
    mealChoice: number,
  ) => void;
}

export const MealSelector = ({
  partner = false,
  currentMealChoice,
  mealChoiceErrors,
  setDirty,
  changeMealChoice,
}: MealSelectorProps) => {
  const { foodOptions, enabled } = useContext(MealContext);
  if (!enabled) {
    return null; // If meal options are not enabled, return null
  }
  const makeGroup = (type: "starter" | "main" | "dessert") => {
    return (
      <Grid size={1}>
        <FormControl fullWidth>
          <Typography sx={{ textAlign: "left" }}>
            {toTitleCase(type)}
          </Typography>
          <Select
            id={`mealChoice-${partner ? "partner-" : ""}${type}`}
            fullWidth
            value={currentMealChoice[type]}
            error={mealChoiceErrors[type]}
            onChange={(event) => {
              if (mealChoiceErrors[type] && event.target.value !== -1) {
                setDirty(false);
              }
              changeMealChoice(type, event.target.value as number);
            }}
            input={<OutlinedInput />}
          >
            <MenuItem value={-1} disabled>
              {`Select ${partner ? "Partner " : ""}${toTitleCase(type)}`}
            </MenuItem>
            {foodOptions[type].map((option) => (
              <MenuItem key={option.food_id} value={option.food_id}>
                {option.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  return (
    <>
      <Typography sx={{ textAlign: "left" }}>
        {`${partner ? "Partner " : ""}`}Meal Choices
      </Typography>
      <Grid container columns={{ xs: 1, sm: 3 }} spacing={1}>
        {makeGroup("starter")}
        {makeGroup("main")}
        {makeGroup("dessert")}
      </Grid>
    </>
  );
};
