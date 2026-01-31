import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC, RefObject } from "react";
import { OutlinedInput } from "./OutlinedInput";

interface NotInvitedPageProps {
  ref: RefObject<HTMLDivElement | null>;
}

const NotInvitedPage: FC<NotInvitedPageProps> = ({ ref }) => (
  <div className="app" ref={ref}>
    <h1 className="fancy">
      You&apos;re{" "}
      <Typography display="inline" component="span" fontSize={40}>
        (maybe)
      </Typography>{" "}
      Invited?
    </h1>
    <p className="fancy">To the Wedding of:</p>
    <p className="fancy">Samuel Andrew Jarvis</p>
    <p className="fancy">&</p>
    <p className="fancy">Claudine Julie Richardson</p>
    <div />
    <Paper sx={{ padding: "1em", marginTop: "1.5em" }}>
      <Typography>
        Please check the link on your invitation. It should have a{" "}
        <Typography
          display="inline"
          component="span"
          sx={{ fontFamily: "monospace" }}
        >
          ?code=abc
        </Typography>{" "}
        at the end.
      </Typography>
      <OutlinedInput
        fullWidth
        id="code"
        placeholder="Enter your code here"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            let code = (e.target as HTMLInputElement).value;
            // if user accidentally adds the ?code= part, remove it
            code = code.replace(/^\s?\??(code)?\s*=?\s*/, "");
            window.location.search = `?code=${code}`;
          }
        }}
      />
    </Paper>
  </div>
);

export default NotInvitedPage;
