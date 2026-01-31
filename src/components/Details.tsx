import {
  createTheme,
  Grid,
  Link,
  Paper,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
const runningOrder = [
  ["11:45am", "Guests to be Seated"],
  ["12:00pm", "The Ceremony"],
  ["12:30pm", "Drinks, Canapés & Photos"],
  ["2:00pm", "Wedding Breakfast"],
  ["3:30pm", "Speeches & Toasts"],
  ["6:45pm", "Cutting of the Cake"],
  ["7:00pm", "Music & Dancing"],
  ["12:00am", "Carriages"],
];

export const Details = () => {
  const globalTheme = useTheme();
  const theme = createTheme({
    ...globalTheme,
    typography: {
      fontFamily: "Garamond, serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ padding: 1, zIndex: 20, position: "relative", marginTop: "30vh" }}
        className={"details"}
      >
        <h2 className="fancy">Details</h2>
        <Grid container columns={{ xs: 1, sm: 3 }} spacing={2} padding={1}>
          <Grid container columns={{ xs: 1, sm: 2 }} padding={1} size={2}>
            <Grid container size={1} columns={1} gap={1}>
              <Grid size={1}>
                <Typography variant="h6">Date & Time</Typography>
                <Typography>Saturday, 22nd August 2026</Typography>
                <Typography>Guests to be seated by 11.45</Typography>
                <Typography>Ceremony at midday</Typography>
              </Grid>

              <Grid size={1}>
                <Typography variant="h6">Location</Typography>
                <Link
                  variant="body1"
                  href="https://www.handpickedhotels.co.uk/rookeryhall"
                  target="_blank"
                >
                  Rookery Hall Hotel and Spa
                </Link>
                <Typography>Main Road</Typography>
                <Typography>Nantwich</Typography>
                <Typography>Cheshire</Typography>
                <Typography>CW5 6DQ</Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="h6">What to wear</Typography>
                <Typography>Dress Code: Formal - Suited and Booted!</Typography>
                <Typography>
                  We are hoping for an outdoor ceremony (weather permitting!).
                  Since this will mean walking on grass, we suggest choosing
                  your footwear accordingly.
                </Typography>
              </Grid>
            </Grid>
            <Grid size={1} sx={{ lineHeight: "0.8rem" }}>
              <Typography variant="h6">The Order of the Day</Typography>
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
            <Grid size={1}>
              <Typography variant="h6">Gifts</Typography>
              <Typography>
                Your presence at our wedding is the greatest gift we could ask
                for. However, if you do wish to give a gift, a donation toward
                our honeymoon fund would be sincerely appreciated.
              </Typography>
              <Typography>
                Bank Transfer: Claudine Richardson | Sort Code: 60-83-71 |
                Account: 62999637
              </Typography>
              <Typography>
                International Guests: IBAN:GB56SRLG60837162999637 | SWIFT/BIC:
                SRLGGB2L
              </Typography>
              <Link
                variant="body1"
                href="https://paypal.me/sjcrweddingfund"
                target="_blank"
              >
                paypal.me/sjcrweddingfund
              </Link>
            </Grid>
            <Grid size={1}>
              <Typography variant="h6">Transport</Typography>
              <Typography>
                The nearest airport to the venue is{" "}
                <Link
                  href="https://maps.app.goo.gl/xrbDCoJDfjJdTgq9A"
                  target="_blank"
                >
                  Manchester Airport
                </Link>
                , which is approximately 40 minutes away. Find the Google Maps
                route{" "}
                <Link
                  href="https://maps.app.goo.gl/JCyVgEABZK3HGQdr8"
                  target="_blank"
                >
                  here
                </Link>
                .
              </Typography>
              <Typography>
                There is plenty of parking available directly at Rookery Hall.
              </Typography>
              <Typography>
                As Rookery Hall is in a rural area, taxis should be booked in
                advance via{" "}
                <Link href="https://astartaxiscrewe.co.uk/" target="_blank">
                  A Star Taxis
                </Link>
                {" ("}
                <Link href="tel:01270 895044" target="_blank">
                  01270 895044
                </Link>
                ). We recommend booking your return taxi for midnight to
                coincide with the end of the celebrations.
              </Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography>
                If you have any questions about the travel, the venue, or
                anything else, please don&apos;t hesitate to reach out!
              </Typography>
              <Typography>
                Sam: <Link href="tel:+447479556711">+44 7479 556 711</Link>
              </Typography>
              <Typography>
                Claudine: <Link href="tel:+447948347550">+44 7948 347 550</Link>
              </Typography>
              <Typography>
                On the day of the wedding: Please reach out to our Maid of
                Honour, Natalie, at{" "}
                <Link href="tel:+447736350670">+44 7736 350 670</Link>, as we
                may not be checking our phones!
              </Typography>
            </Grid>

            <Grid size={1}>
              <Typography variant="h6">Accommodation</Typography>
              <Typography>
                A discounted block of rooms is available at Rookery Hall for the
                night of the wedding. Please mention our names when calling to
                book.{" "}
                <Link target="_blank" href="tel:01270 610016">
                  Tel:01270 610016
                </Link>
              </Typography>
              <Typography>
                If you&apos;d prefer to explore other options, here are some{" "}
                <Link
                  href="https://maps.app.goo.gl/gg53hqggThKMc77FA"
                  target="_blank"
                >
                  nearby hotels
                </Link>
                .
              </Typography>
            </Grid>
          </Grid>
          <Grid container size={1} columns={1}>
            <Grid size={1}>
              <img
                width="100%"
                src="https://www.handpickedhotels.co.uk/oimgnn/images/hotels/generic-images/HomepageVI/Hotel%20homepages/RHH/Insta/Rookery%20IG%20-%201-768.jpg"
              />
            </Grid>
            <Grid size={1}>
              <Typography variant="h6">Map</Typography>
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
