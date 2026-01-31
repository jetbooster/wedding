import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC, FormEventHandler, RefObject, useContext, useState } from "react";
import { OutlinedInput } from "./OutlinedInput";
import { Button } from "@mui/material";
import { UserContext } from "@/context/UserContext";
import { getUserByName } from "@/api_calls";
import { DialogContext } from "@/context/DialogContext";

interface NotInvitedPageProps {
  ref: RefObject<HTMLDivElement | null>;
}

const NotInvitedPage: FC<NotInvitedPageProps> = ({ ref }) => {
  const { setUser } = useContext(UserContext);
  const { setContent } = useContext(DialogContext);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);

    getUserByName(first, last)
      .then((user) => {
        if (user) {
          setUser(user);
        }
      })
      .catch((error) => {
        console.log(error);
        setContent({ message: error.message, isError: true });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="app">
      <div className="appear" ref={ref}>
        <h1 className="fancy">
          You&apos;re{" "}
          <Typography display="inline" component="span" fontSize={40}>
            (maybe)
          </Typography>{" "}
          Invited?
        </h1>
        <p className="fancy">To the Wedding of</p>
        <p className="fancy">Claudine Julie Richardson</p>
        <p className="fancy">&</p>
        <p className="fancy">Samuel Andrew Jarvis</p>
      </div>
      <Paper sx={{ padding: "1em", marginTop: "1.5em" }}>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography>Hello! Please Enter your first/last name</Typography>
          <OutlinedInput
            fullWidth
            id="first-name"
            placeholder="First Name"
            onChange={(e) => setFirst(e.target.value)}
          />
          <OutlinedInput
            fullWidth
            id="last-name"
            placeholder="Last Name"
            onChange={(e) => setLast(e.target.value)}
          />
          <Button fullWidth variant="contained" loading={loading} type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default NotInvitedPage;
