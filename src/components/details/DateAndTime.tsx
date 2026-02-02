import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const DateAndTime: FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "details.dateAndTime" });
  return (
    <Grid size={1}>
      <Typography variant="h6">{t("title")}</Typography>
      <Typography>{t("longDate")}</Typography>
      <Typography>{t("seated")}</Typography>
      <Typography>{t("ceremony")}</Typography>
    </Grid>
  );
};

export default DateAndTime;
