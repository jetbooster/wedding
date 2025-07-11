import { Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Dispatch, SetStateAction } from "react";
import { OutlinedInput } from "./OutlinedInput";

export const IsNotAttending = ({
  changeNotes,
}: {
  changeNotes: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <Fragment>
      <Typography>Sorry to hear that. Thanks for letting us know.</Typography>
      <Typography sx={{ textAlign: "left" }}>Any Final Words?</Typography>
      <OutlinedInput
        id="notes"
        multiline
        minRows={3}
        fullWidth
        inputProps={{ style: { width: "inherit" } }}
        onChange={(event) => changeNotes(event.target.value)}
      />
    </Fragment>
  );
};
