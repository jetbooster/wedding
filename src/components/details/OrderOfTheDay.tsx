import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

const OrderOfTheDay = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "details.runningOrder",
  });
  const runningOrder = [
    ["11:45am", t("seated")],
    ["12:00pm", t("ceremony")],
    ["12:30pm", t("drinks")],
    ["3:00pm", t("breakfast")],
    ["5:30pm", t("speeches")],
    ["6:45pm", t("cutting")],
    ["7:00pm", t("dancing")],
    ["1:00am", t("carriages")],
  ];
  return (
    <Grid size={1} sx={{ lineHeight: "0.8rem" }}>
      <Typography variant="h6">{t("title")}</Typography>
      {runningOrder.map(([time, event]) => (
        <Fragment key={time}>
          <Typography lineHeight={1.4} sx={{ fontWeight: 800 }}>
            {time}
          </Typography>
          <Typography lineHeight={1.4} marginBottom={0.7}>
            {event}
          </Typography>
        </Fragment>
      ))}
    </Grid>
  );
};

export default OrderOfTheDay;
