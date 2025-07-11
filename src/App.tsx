import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Form } from "./components/Form";
import "./index.css";
import Details from "./components/Details";
import { FoodOptions } from "./types";
import {
  Alert,
  OutlinedInput,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from "@mui/material";
import { MealContext } from "./context/MealContext";
import { UserContext } from "./context/UserContext";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export function App() {
  const [user, setUser] = useState();
  const [error, setError] = useState<string | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [foodOptions, setFoodOptions] = useState<FoodOptions>({
    starter: [],
    main: [],
    dessert: [],
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/get_food")
      .then((result) => result.json())
      .then((result) => {
        setFoodOptions({
          starter: result.starter,
          main: result.main,
          dessert: result.dessert,
        });
      });
  }, []);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  useEffect(() => {
    const interval = 750;
    const curr = ref.current;
    for (const [index, val] of Array(...(curr?.children || [])).entries()) {
      setTimeout(() => {
        val.classList.add("fade-in");
      }, index * interval);
    }
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      fetch(`/api/get_user/${code}`)
        .then((result) => result.json())
        .then((result) => {
          setUser(result);
        })
        .catch(() => {
          setError(
            "Couldn't find a user with that code. Please check the link on your invitation.",
          );
        });
    }
  }, [searchParams]);

  return (
    <UserContext value={{ user: user }}>
      <MealContext value={{ foodOptions, enabled: true }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          color="error"
          slots={{ transition: SlideTransition }}
          onClose={() => {
            setSnackbarOpen(false);
          }}
          onAnimationEnd={() => {
            setError(undefined);
          }}
        >
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Snackbar>
        <div className="imageLeft" />
        <div className="imageRight" />
        {user ? (
          <div className="app" ref={ref}>
            <h1 className="fancy">You&apos;re Invited!</h1>
            <p className="fancy">To the Wedding of:</p>
            <p className="fancy">Samuel Andrew Jarvis</p>
            <p className="fancy">&</p>
            <p className="fancy">Claudine Julie Richardson</p>
            <div />
            <Details />
            <Form />
          </div>
        ) : (
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
        )}
      </MealContext>
    </UserContext>
  );
}

export default App;
