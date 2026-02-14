import {
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import OrderOfTheDay from "./OrderOfTheDay";
import DateAndTime from "./DateAndTime";
import Location from "./Location";
import DressCode from "./DressCode";
import Gifts from "./Gifts";
import Transport from "./Transport";
import ContactUs from "./ContactUs";
import Accomodation from "./Accomodation";
import { useTranslation } from "react-i18next";

export const Details = () => {
  const globalTheme = useTheme();
  const theme = createTheme({
    ...globalTheme,
    typography: {
      fontFamily: "Garamond, serif",
    },
  });
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          padding: 1,
          zIndex: 20,
          position: "relative",
          marginTop: { xs: "10vh", lg: "30vh" },
        }}
        className={"details"}
      >
        <h2 className="fancy">Details</h2>
        <Grid container columns={{ xs: 1, sm: 3 }} spacing={2} padding={1}>
          <Grid
            container
            columns={{ xs: 1, sm: 2 }}
            padding={1}
            size={2}
            columnGap={2}
          >
            <Grid container size={1} columns={1} gap={1}>
              <DateAndTime />

              <Location />
              <DressCode />
            </Grid>
            <OrderOfTheDay />
            <Gifts />
            <Transport />
            <ContactUs />
            <Accomodation />
          </Grid>
          <Grid container size={1} columns={1}>
            <Grid size={1}>
              <img
                width="100%"
                src="https://www.handpickedhotels.co.uk/oimgnn/images/hotels/generic-images/HomepageVI/Hotel%20homepages/RHH/Insta/Rookery%20IG%20-%201-768.jpg"
              />
            </Grid>
            <Grid size={1}>
              <Typography variant="h6">{t("details.map")}</Typography>
              <iframe
                src="https://www.google.com/maps/embed/v1/search?key=AIzaSyAC3RnrSwTFpi8vk1Wt0ujGYPLgODC0C_Y&q=hotels+rookery+hall+nantwich&center=53.2594,-2.548&zoom=9"
                width="100%"
                height="300px"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default Details;
