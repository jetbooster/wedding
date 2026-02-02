import { FormErrors } from "@/types";
import { FormControl, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { OutlinedInput } from "./OutlinedInput";

type IsAttendingProps = {
  formErrors: FormErrors;
  child: number;
  dietryReqs: string | undefined;
  notes: string | undefined;
  changeDietryReqs: Dispatch<SetStateAction<string | undefined>>;
  changeChildren: Dispatch<SetStateAction<string | undefined>>;
  changeNotes: Dispatch<SetStateAction<string | undefined>>;
  setDirty: Dispatch<SetStateAction<boolean>>;
};

export const IsAttending = ({
  formErrors,
  child,
  dietryReqs,
  notes,
  changeDietryReqs,
  changeChildren,
  changeNotes,
  setDirty,
}: IsAttendingProps) => {
  return (
    <Stack spacing={2}>
      <Typography textAlign={"center"}>Great!</Typography>
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Number of Children Attending. Completely happy to see them there, but
          otherwise please feel free to use this as a good excuse to get a night
          off!
        </Typography>
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
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          Any Dietry Requirements; Vegetarian, Vegan, allergies?
        </Typography>
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
        <Typography sx={{ textAlign: "left" }}>
          Any Other Notes or Special Requirements?
        </Typography>
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
