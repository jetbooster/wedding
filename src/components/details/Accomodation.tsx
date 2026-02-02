import { Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Accomodation: FC = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "details.accomodation",
  });
  return (
    <Grid size={1}>
      <Typography variant="h6">{t("title")}</Typography>
      <Typography>{t("description")}</Typography>
      <Typography>
        <Link target="_blank" href="tel:01270 610016">
          Tel:+44 1270 610016
        </Link>
      </Typography>
      <Typography>
        {t("other")}
        <Link href="https://maps.app.goo.gl/gg53hqggThKMc77FA" target="_blank">
          {t("nearby")}
        </Link>
        .
      </Typography>
    </Grid>
  );
};

export default Accomodation;
