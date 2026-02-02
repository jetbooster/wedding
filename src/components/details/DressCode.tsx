import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const DressCode: FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "details.dressCode" });
  return (
    <Grid size={1}>
      <Typography variant="h6">{t("title")}</Typography>
      <Typography>{t("dressCode")}</Typography>
      <Typography>{t("description")}</Typography>
    </Grid>
  );
};

export default DressCode;
