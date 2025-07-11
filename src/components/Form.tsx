import {
  Button,
  FormControl,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { FormErrors, MealChoice } from "../types";
import { useContext, useEffect, useState } from "react";
import { IsAttending } from "./IsAttending";
import { IsNotAttending } from "./IsNotAttending";
import { AnimatePresence, motion } from "motion/react";
import { OutlinedInput } from "./OutlinedInput";
import { submitResponse } from "../api_calls/submitResponse";
import { UserContext } from "@/context/UserContext";

const BLANK_MEAL_CHOICE: MealChoice = {
  starter: -1,
  main: -1,
  dessert: -1,
};
const BLANK_MEAL_ERRORS: FormErrors["mealChoice"] = {
  starter: false,
  main: false,
  dessert: false,
};

export function Form() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [attending, setAttending] = useState<string | undefined>();
  const [dirty, setDirty] = useState<boolean>(false);
  const [watching, setWatching] = useState<boolean>(false);
  const [partnerAttending, setPartnerAttending] = useState<
    string | undefined
  >();
  const [partnerName, setPartnerName] = useState<string | undefined>(
    user?.partner_name
  );
  const [mealChoice, setMealChoice] = useState<MealChoice>(BLANK_MEAL_CHOICE);
  const [partnerMealChoice, setPartnerMealChoice] =
    useState<MealChoice>(BLANK_MEAL_CHOICE);
  const [children, setChildren] = useState<string | undefined>("0");
  const [notes, setNotes] = useState<string | undefined>();

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    partnerName: false,
    mealChoice: {
      starter: false,
      main: false,
      dessert: false,
    },
    partnerMealChoice: {
      starter: false,
      main: false,
      dessert: false,
    },
    children: false,
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPartnerName(user.partner_name);
    }
  }, [user]);

  useEffect(() => {
    if (watching) {
      processFormErrors();
    }
  }, [dirty]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAttending: string
  ) => {
    if (dirty && newAttending) {
      setDirty(false);
    }
    setAttending(newAttending);
  };

  const processMealError = (mealChoice: MealChoice) => {
    if (!mealChoice) {
      return { starter: true, main: true, dessert: true };
    }
    return {
      starter: mealChoice.starter < 0,
      main: mealChoice.main < 0,
      dessert: mealChoice.dessert < 0,
    };
  };

  const processFormErrors = () => {
    const errors: FormErrors = {
      name: !name || name.length < 1,
      partnerName:
        partnerAttending === "yes" && (!partnerName || partnerName.length < 1),
      mealChoice:
        attending === "yes" ? processMealError(mealChoice) : BLANK_MEAL_ERRORS,
      partnerMealChoice:
        partnerAttending === "yes"
          ? processMealError(partnerMealChoice)
          : BLANK_MEAL_ERRORS,
      children:
        !children ||
        (Number.isInteger(Number(children)) && Number(children) >= 0)
          ? false
          : true,
    };
    setFormErrors(errors);
    const dirty =
      errors.name ||
      errors.partnerName ||
      errors.mealChoice.starter ||
      errors.mealChoice.main ||
      errors.mealChoice.dessert ||
      errors.partnerMealChoice.starter ||
      errors.partnerMealChoice.main ||
      errors.partnerMealChoice.dessert ||
      errors.children;
    setDirty(dirty);
    return dirty;
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (dirty && event.target.value && event.target.value.length > 0) {
      setDirty(false);
    }
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWatching(true);
    if (processFormErrors()) {
      return;
    }
    submitResponse(
      {
        name,
        attending: attending === "yes" ? true : false,
        partner_attending: partnerAttending === "yes" ? true : false,
        partner_name: partnerName,
        meal_choice: mealChoice,
        partner_meal_choice: partnerMealChoice,
        children: Number(children),
        notes,
      },
      user?.user_id
    );
  };
  return (
    <Paper sx={{ marginTop: "1.5em" }}>
      <h2 className="fancy">RSVP</h2>
      <form onSubmit={handleSubmit}>
        <Stack
          padding={2}
          spacing={2}
          sx={{ transition: "height ease-in-out 0.2s" }}
        >
          <Typography>
            Hello {user?.name || "blah"}. Not you? you may have gotten the wrong
            code. Contact us immidiately!
          </Typography>
          <FormControl fullWidth>
            <Typography sx={{ textAlign: "left" }}>
              Name (Please correct any spelling errors)
            </Typography>
            <OutlinedInput
              fullWidth
              id="name"
              defaultValue={user?.name}
              onChange={handleNameChange}
              error={formErrors.name}
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
            {attending === "yes" && (
              <motion.div
                key="yes"
                style={{ textAlign: "left" }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <IsAttending
                  user={user!}
                  partnerAttending={partnerAttending}
                  changePartnerAttending={setPartnerAttending}
                  mealChoice={mealChoice}
                  partnerMealChoice={partnerMealChoice}
                  changeMealChoice={setMealChoice}
                  changePartnerMealChoice={setPartnerMealChoice}
                  changePartnerName={setPartnerName}
                  changeChildren={setChildren}
                  changeNotes={setNotes}
                  formErrors={formErrors}
                  setDirty={setDirty}
                />
              </motion.div>
            )}
            {attending === "no" && (
              <motion.div
                key="no"
                style={{ textAlign: "left" }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <IsNotAttending changeNotes={setNotes} />
              </motion.div>
            )}
          </AnimatePresence>
          <Button fullWidth type="submit" variant="contained" disabled={dirty}>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
