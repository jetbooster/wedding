import { Grid, Link, Paper, Typography } from "@mui/material";

export const Details = () => (
  <Paper sx={{ padding: 1 }}>
    <h2 className="fancy">Details</h2>
    <Grid container columns={{ xs: 1, sm: 3 }} spacing={2} padding={1}>
      <Grid container columns={2} padding={1} size={2}>
        <Grid size={1}>
          <Typography variant="h6">Date</Typography>
          <Typography>Saturday 22nd August 2026</Typography>
          <Typography>Guests from 11:00am, Service at Midday.</Typography>
          <Typography>Carriages at Midnight</Typography>
        </Grid>
        <Grid size={1}>
          <Typography variant="h6">Location</Typography>
          <Link href="https://www.handpickedhotels.co.uk/rookeryhall">
            Rookery Hall, Cheshire
          </Link>
          <Typography>Main Rd</Typography>
          <Typography>Worleston</Typography>
          <Typography>Nantwich</Typography>
          <Typography>CW5 6DQ</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="h6">Accommodation</Typography>
          <Typography>
            We have reserved limited rooms at the hotel for the night of the
            wedding.
          </Typography>
          <Typography>
            To book a room, please call the hotel directly and mention
          </Typography>
          <Typography>the wedding of Samuel and Claudine.</Typography>
          <Typography>
            Otherwise, Nantwich is roughly 10m drive away.
          </Typography>
        </Grid>
      </Grid>
      <Grid size={1}>
        <img
          width="100%"
          src="https://www.handpickedhotels.co.uk/oimgnn/images/hotels/generic-images/HomepageVI/Hotel%20homepages/RHH/Insta/Rookery%20IG%20-%201-768.jpg"
        />
      </Grid>
    </Grid>
  </Paper>
);

export default Details;
