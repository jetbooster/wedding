import { Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

const ContactUs: FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "details.contactUs" });
  return (
    <Grid size={1}>
      <Typography variant="h6">{t("title")}</Typography>
      <Typography>{t("description")}</Typography>
      <Typography>
        Sam: <Link href="tel:+447479556711">+44 7479 556 711</Link>
      </Typography>
      <Typography>
        Claudine: <Link href="tel:+447948347550">+44 7948 347 550</Link>
      </Typography>
      <Typography>
        {new Date() > new Date("2026-08-21T00:00:00.000Z") && (
          <Trans
            i18nKey="details.contactUs.nat"
            components={{
              1: <Link href="tel:+447736350670" />,
            }}
          />
        )}
      </Typography>
    </Grid>
  );
};

export default ContactUs;