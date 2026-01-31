import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import "./index.css";
import { FoodOptions } from "./types";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { MealContext } from "./context/MealContext";
import { UserContext } from "./context/UserContext";
import NotInvitedPage from "./components/NotInvitedPage";
import InvitedPage from "./components/InvitedPage";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        })
        .catch(() => {
          setError(
            "Couldn't find a user with that code. Please check the link on your invitation.",
          );
          setLoading(false);
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

        {loading ? undefined : user ? (
          <InvitedPage ref={ref} />
        ) : (
          <NotInvitedPage ref={ref} />
        )}
      </MealContext>
    </UserContext>
  );
}

export default App;
