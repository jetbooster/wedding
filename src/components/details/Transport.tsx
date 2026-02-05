import { Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

const Transport: FC = () => {
  const { t } = useTranslation();
  return (
    <Grid size={1}>
      <Typography variant="h6">{t("details.transport.title")}</Typography>
      <Trans
        i18nKey="details.transport.airport"
        components={{
          1: <Typography />,
          2: (
            <Link
              href="https://maps.app.goo.gl/xrbDCoJDfjJdTgq9A"
              target="_blank"
            />
          ),
          3: (
            <Link
              href="https://maps.app.goo.gl/JCyVgEABZK3HGQdr8"
              target="_blank"
            />
          ),
        }}
      />

      <Typography>{t("details.transport.parking")}</Typography>
      <Trans
        i18nKey="details.transport.taxis"
        components={{
          1: <Typography />,
          2: <Link href="https://astartaxiscrewe.co.uk/" target="_blank" />,
          3: <Link href="tel:+44 1270 895044" target="_blank" />,
        }}
      />
    </Grid>
  );
};

export default Transport;
