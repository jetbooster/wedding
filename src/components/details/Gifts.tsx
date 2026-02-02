import { Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Gifts: FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "details.gifts" });
  return (
    <Grid size={1}>
      <Typography variant="h6">{t("title")}</Typography>
      <Typography>{t("description")}</Typography>
      <Typography>{t("national")}</Typography>
      <Typography>{t("international")}</Typography>
      <Link
        variant="body1"
        href="https://paypal.me/sjcrweddingfund"
        target="_blank"
      >
        paypal.me/sjcrweddingfund
      </Link>
    </Grid>
  );
};

export default Gifts;
