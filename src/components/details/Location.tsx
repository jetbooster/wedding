import { Grid, Link, Typography } from "@mui/material";
import { FC } from "react";

const Location: FC = () => {
  return (
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
  );
};

export default Location;
