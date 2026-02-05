import { Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Dispatch, SetStateAction } from "react";
import { OutlinedInput } from "./OutlinedInput";
import { useTranslation } from "react-i18next";

export const IsNotAttending = ({
  notes,
  changeNotes,
}: {
  notes: string;
  changeNotes: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "isNotAttending" });
  return (
    <Fragment>
      <Typography>{t("text1")}</Typography>
      <Typography>{t("text2")}</Typography>
      <Typography>{t("text3")}</Typography>
      <Typography>{t("text4")}</Typography>
      <OutlinedInput
        id="notes"
        multiline
        minRows={3}
        fullWidth
        defaultValue={notes}
        inputProps={{ style: { width: "inherit" } }}
        onChange={(event) => changeNotes(event.target.value)}
      />
    </Fragment>
  );
};
