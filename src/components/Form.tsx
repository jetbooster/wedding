import { DialogContext } from "@/context/DialogContext";
import { UserContext } from "@/context/UserContext";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { submitResponse } from "../api_calls";
import { FormErrors, MealChoice, MuiToggleHandler } from "../types";
import AttendingBlock from "./AttendingBlock";
import { IsAttending } from "./IsAttending";
import { IsNotAttending } from "./IsNotAttending";

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
  const { user, setUser, userResponse } = useContext(UserContext);
  const { setContent } = useContext(DialogContext);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [attending, setAttending] = useState<"yes" | "no" | undefined>(
    !userResponse ? undefined : userResponse.attending ? "yes" : "no",
  );
  const [rsvpOpen, setRsvpOpen] = useState(true);
  const [dirty, setDirty] = useState<boolean>(false);
  const [watching, setWatching] = useState<boolean>(false);
  const [partnerAttending, setPartnerAttending] = useState<
    "yes" | "no" | undefined
  >(!userResponse ? undefined : userResponse.attending ? "yes" : "no");
  const [partnerName, setPartnerName] = useState<string | undefined>(
    user?.partner_name,
  );
  const [mealChoice, setMealChoice] = useState<MealChoice>(
    (userResponse && userResponse.mealChoice) || BLANK_MEAL_CHOICE,
  );
  const [partnerMealChoice, setPartnerMealChoice] = useState<MealChoice>(
    (userResponse && userResponse.partnerMealChoice) || BLANK_MEAL_CHOICE,
  );
  const [children, setChildren] = useState<string | undefined>(
    (userResponse && userResponse.children.toString()) || "0",
  );
  const [dietryReqs, setDietryReqs] = useState<string | undefined>(
    (userResponse && userResponse.dietryReqs) || undefined,
  );
  const [notes, setNotes] = useState<string | undefined>(
    (userResponse && userResponse.notes) || undefined,
  );

  useEffect(() => {
    if (userResponse) {
      setRsvpOpen(false);
      setAttending(userResponse.attending ? "yes" : "no");
      setPartnerAttending(userResponse.partner_attending ? "yes" : "no");
      setMealChoice(userResponse.mealChoice);
      setPartnerMealChoice(userResponse.partnerMealChoice);
      setNotes(userResponse.notes);
      setChildren(userResponse.children.toString());
      setDietryReqs(userResponse.dietryReqs);
    }
  }, [userResponse]);

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

  const handleMealChange = (
    type: "starter" | "main" | "dessert",
    mealChoice: number,
  ) => {
    if (mealChoice !== -1 && formErrors.mealChoice[type]) {
      setDirty(false);
    }
    setMealChoice((prev) => ({
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
    setPartnerMealChoice((prev) => ({
      ...prev,
      [type]: mealChoice,
    }));
  };

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

  const handleAttendingChange: MuiToggleHandler<"yes" | "no" | undefined> = (
    event,
    value,
  ) => {
    if (dirty && value) {
      setDirty(false);
    }
    setAttending(value);
  };

  const handlePartnerAttendingChange: MuiToggleHandler<
    "yes" | "no" | undefined
  > = (event, value) => {
    if (dirty && value) {
      setDirty(false);
    }
    setPartnerAttending(value);
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

  const handlePartnerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
        dietry_reqs: dietryReqs,
        children: Number(children),
        notes,
      },
      user?.user_id,
    )
      .then(() => {
        setContent({ message: "Submission received!" });
        setRsvpOpen(false);
      })
      .catch((e) => {
        setContent({ message: e.message, isError: true });
      });
  };

  const names = [];
  if (user?.name) {
    names.push(user.name);
  }
  if (user?.partner_name) {
    names.push(user.partner_name);
  }
  return (
    <Paper sx={{ marginTop: "1.5em", zIndex: 20, position: "relative" }}>
      <h2 className="fancy">RSVP</h2>
      {rsvpOpen ? (
        <form onSubmit={handleSubmit}>
          <Stack
            padding={2}
            spacing={2}
            sx={{ transition: "height ease-in-out 0.2s" }}
          >
            <Typography>
              Please let us know if you can join us by{" "}
              <b>Wednesday 22nd July, 2026</b>
            </Typography>
            <Typography>
              Welcome {names.join(" & ")}. We are so excited to share our day
              with you. If this isn&apos;t you, please{" "}
              <Button
                variant="text"
                sx={{
                  textTransform: "initial",
                  textDecoration: "underline",
                  padding: "1px",
                }}
                onClick={() => {
                  setUser(undefined);
                }}
              >
                click here to sign out
              </Button>
            </Typography>
            <AttendingBlock
              name={user?.name || ""}
              attending={attending}
              mealChoice={mealChoice}
              isPartner={false}
              setDirty={setDirty}
              handleAttending={handleAttendingChange}
              handleNameChange={handleNameChange}
              handleMealChange={handleMealChange}
              nameFormError={formErrors.name}
              mealFormError={formErrors.mealChoice}
            />
            {user?.allowed_partner && (
              <>
                <Typography variant="h5">&</Typography>
                <AttendingBlock
                  name={user?.partner_name || ""}
                  attending={partnerAttending}
                  mealChoice={partnerMealChoice}
                  isPartner={true}
                  setDirty={setDirty}
                  handleAttending={handlePartnerAttendingChange}
                  handleNameChange={handlePartnerNameChange}
                  handleMealChange={handlePartnerMealChange}
                  nameFormError={formErrors.partnerName}
                  mealFormError={formErrors.partnerMealChoice}
                />
              </>
            )}
            <AnimatePresence>
              {(attending === "yes" || partnerAttending === "yes") && (
                <motion.div
                  key="yes"
                  style={{ textAlign: "left" }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <IsAttending
                    child={Number(children)}
                    notes={notes}
                    changeChildren={setChildren}
                    changeNotes={setNotes}
                    dietryReqs={dietryReqs}
                    changeDietryReqs={setDietryReqs}
                    formErrors={formErrors}
                    setDirty={setDirty}
                  />
                </motion.div>
              )}
              {attending === "no" && partnerAttending === "no" && (
                <motion.div
                  key="no"
                  style={{ textAlign: "left" }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <IsNotAttending notes={notes || ""} changeNotes={setNotes} />
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={dirty}
            >
              Submit
            </Button>
          </Stack>
        </form>
      ) : (
        <div style={{ padding: "1rem" }}>
          <Typography>
            Thank you {names.join(" & ")}! We have already received an RSVP from
            your party.
          </Typography>
          <div style={{ marginTop: "1rem" }}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => setRsvpOpen(true)}
            >
              Edit Response
            </Button>
          </div>
        </div>
      )}
    </Paper>
  );
}
