import { FormErrors, MealChoice, User } from "@/types";
import {
  FormControl,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { MealSelector } from "./MealSelector";
import { OutlinedInput } from "./OutlinedInput";

type IsAttendingProps = {
  user: User;
  partnerAttending: string | undefined;
  mealChoice: MealChoice;
  partnerMealChoice: MealChoice | undefined;
  formErrors: FormErrors;
  changePartnerAttending: Dispatch<SetStateAction<string | undefined>>;
  changeMealChoice: Dispatch<SetStateAction<MealChoice>>;
  changePartnerMealChoice: Dispatch<SetStateAction<MealChoice>>;
  changePartnerName: Dispatch<SetStateAction<string | undefined>>;
  changeChildren: Dispatch<SetStateAction<string | undefined>>;
  changeNotes: Dispatch<SetStateAction<string | undefined>>;
  setDirty: Dispatch<SetStateAction<boolean>>;
};

export const IsAttending = ({
  user,
  partnerAttending,
  mealChoice,
  partnerMealChoice,
  formErrors,
  changePartnerAttending,
  changeMealChoice,
  changePartnerMealChoice,
  changePartnerName,
  changeChildren,
  changeNotes,
  setDirty,
}: IsAttendingProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAttending: string,
  ) => {
    if (newAttending !== null && formErrors.partnerName) {
      setDirty(false);
    }
    changePartnerAttending(newAttending);
  };

  const handleMealChange = (
    type: "starter" | "main" | "dessert",
    mealChoice: number,
  ) => {
    if (mealChoice !== -1 && formErrors.mealChoice[type]) {
      setDirty(false);
    }
    changeMealChoice((prev) => ({
      ...prev,
      [type]: mealChoice,
    }));
  };

  const handlePartnerMealChange = (
    type: "starter" | "main" | "dessert",
    mealChoice: number,
  ) => {
    if (mealChoice !== -1 && formErrors.partnerMealChoice[type]) {
      setDirty(false);
    }
    changePartnerMealChoice((prev) => ({
      ...prev,
      [type]: mealChoice,
    }));
  };

  return (
    <Stack spacing={2}>
      <Typography textAlign={"center"}>Great!</Typography>
      <MealSelector
        currentMealChoice={mealChoice}
        mealChoiceErrors={formErrors.mealChoice}
        setDirty={setDirty}
        changeMealChoice={handleMealChange}
      />
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Will your partner be attending?
        </Typography>
        <ToggleButtonGroup
          id="attending"
          color={partnerAttending === "yes" ? "secondary" : "error"}
          sx={{ backgroundColor: "#ffe" }}
          value={partnerAttending}
          exclusive
          onChange={handleChange}
          aria-label="text alignment"
          fullWidth
        >
          <ToggleButton value="yes" aria-label="yes">
            Yes
          </ToggleButton>
          <ToggleButton value="no" aria-label="no">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      <AnimatePresence>
        {user.allowed_partner == 1 && partnerAttending == "yes" && (
          <motion.div
            key="yes"
            style={{ textAlign: "left" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <FormControl fullWidth>
              <Typography textAlign={"center"}>Great!</Typography>
              <Typography sx={{ textAlign: "left" }}>
                Name of your partner (Please correct any spelling errors)
              </Typography>
              <OutlinedInput
                id="partnerName"
                value={user?.partner_name}
                error={formErrors.partnerName}
                onChange={(event) => {
                  if (
                    event.target.value &&
                    event.target.value.length > 0 &&
                    formErrors.partnerName
                  ) {
                    setDirty(false);
                  }
                  changePartnerName(event.target.value);
                }}
              />
            </FormControl>
            <MealSelector
              partner
              currentMealChoice={partnerMealChoice!}
              mealChoiceErrors={formErrors.partnerMealChoice}
              setDirty={setDirty}
              changeMealChoice={handlePartnerMealChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Number of Children Attending. Completely happy to see them there, but
          otherwise please feel free to use this as a good excuse to get a night
          off!
        </Typography>
        <OutlinedInput
          id="children"
          defaultValue={0}
          error={formErrors.children}
          onChange={(event) => {
            if (formErrors.children) {
              setDirty(false);
            }
            changeChildren(event.target.value);
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Any Notes or Special Requirements; Vegetarian,Vegan,allergies? If
          children are attending, please let us know their names and ages.
        </Typography>
        <OutlinedInput
          id="notes"
          multiline
          minRows={3}
          fullWidth
          onChange={(event) => changeNotes(event.target.value)}
        />
      </FormControl>
    </Stack>
  );
};
