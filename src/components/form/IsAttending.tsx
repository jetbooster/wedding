import { ChildMealChoice, FormErrors } from "@/types";
import { FormControl, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { OutlinedInput } from "./OutlinedInput";
import { useTranslation } from "react-i18next";
import ChildAttendingBlock from "./ChildAttendingBlock";
import { BLANK_CHILD_MEAL_CHOICE } from "@/constants";

type IsAttendingProps = {
  formErrors: FormErrors;
  child: number;
  childrenMealChoices: ChildMealChoice[];
  dietryReqs: string | undefined;
  notes: string | undefined;
  changeDietryReqs: Dispatch<SetStateAction<string | undefined>>;
  changeChildren: (val: string | undefined) => void;
  changeChildrenMealChoices: (index: number, val: ChildMealChoice) => void;
  changeNotes: Dispatch<SetStateAction<string | undefined>>;
  setDirty: Dispatch<SetStateAction<boolean>>;
};

export const IsAttending = ({
  formErrors,
  child,
  childrenMealChoices,
  dietryReqs,
  notes,
  changeDietryReqs,
  changeChildren,
  changeChildrenMealChoices,
  changeNotes,
  setDirty,
}: IsAttendingProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "isAttending" });
  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>{t("children")}</Typography>
        <OutlinedInput
          id="children"
          defaultValue={child || 0}
          error={formErrors.children}
          onChange={(event) => {
            if (formErrors.children) {
              setDirty(false);
            }
            changeChildren(event.target.value);
          }}
        />
      </FormControl>
      {child > 0 &&
        [...Array(child).keys()].map((index) => (
          <ChildAttendingBlock
            key={index}
            childIndex={index}
            childMealChoice={
              childrenMealChoices[index] || BLANK_CHILD_MEAL_CHOICE
            }
            handleMealChange={changeChildrenMealChoices}
          />
        ))}
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>{t("dietry")}</Typography>
        <OutlinedInput
          id="notes"
          multiline
          minRows={3}
          fullWidth
          defaultValue={dietryReqs}
          onChange={(event) => changeDietryReqs(event.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>{t("notes")}</Typography>
        <OutlinedInput
          id="notes"
          multiline
          minRows={3}
          fullWidth
          defaultValue={notes}
          onChange={(event) => changeNotes(event.target.value)}
        />
      </FormControl>
    </Stack>
  );
};
