import { FormErrors, MealChoice, MuiToggleHandler } from "@/types";
import {
  FormControl,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";
import { MealSelector } from "./MealSelector";

interface AttendingBlock {
  name: string;
  mealChoice: MealChoice;
  attending: "yes" | "no" | undefined;
  isPartner: boolean;
  handleAttending: MuiToggleHandler<"yes" | "no" | undefined>;
  handleNameChange: React.ChangeEventHandler;
  handleMealChange: (
    type: "starter" | "main" | "dessert",
    mealChoice: number,
  ) => void;
  setDirty: React.Dispatch<React.SetStateAction<boolean>>;
  nameFormError: boolean;
  mealFormError: FormErrors["mealChoice"];
}

const AttendingBlock: FC<AttendingBlock> = ({
  name,
  mealChoice,
  attending,
  isPartner,
  handleAttending,
  handleNameChange,
  handleMealChange,
  setDirty,
  nameFormError,
  mealFormError,
}) => {
  return (
    <div
      style={{
        border: "1px solid #aaa",
        borderRadius: "4px",
        padding: "10px 10px ",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Name (Please feel free to correct any spelling errors here)
        </Typography>
        <OutlinedInput
          fullWidth
          id="name"
          defaultValue={name}
          onChange={handleNameChange}
          error={nameFormError}
          sx={{ backgroundColor: "#ffffe6" }}
        />
      </FormControl>
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Will you be attending?
        </Typography>
        <ToggleButtonGroup
          id="attending"
          color={attending === "yes" ? "secondary" : "error"}
          sx={{ backgroundColor: "#ffe" }}
          value={attending}
          exclusive
          onChange={handleAttending}
          aria-label="text alignment"
          fullWidth
        >
          <ToggleButton
            value="yes"
            aria-label="yes"
            sx={{ border: 1, textTransform: "none", color: "#222" }}
          >
            Yes, I can&apos;t wait!
          </ToggleButton>
          <ToggleButton
            value="no"
            aria-label="no"
            sx={{ border: 1, textTransform: "none", color: "#222" }}
          >
            No, but I&apos;ll be there in spirit
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
      <AnimatePresence>
        {attending === "yes" && (
          <motion.div
            key="yes"
            style={{ textAlign: "left" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <MealSelector
              partner={isPartner}
              currentMealChoice={mealChoice}
              mealChoiceErrors={mealFormError}
              setDirty={setDirty}
              changeMealChoice={handleMealChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendingBlock;
