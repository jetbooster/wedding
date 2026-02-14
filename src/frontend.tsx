/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { UserProvider } from "./context/UserContext";
import { MealProvider } from "./context/MealContext";
import { DialogProvider } from "./context/DialogContext";
import "./i18n/config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002901de",
    },
    secondary: {
      main: green[400],
    },
    background: {
      paper: "#f8f8f8",
    },
    text: {
      primary: "#002901de",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Georgia, serif",
    },
  },
  components: {
    MuiToggleButton: {
      defaultProps: {
        sx: {
          textTransform: "initial",
        },
      },
    },
  },
});

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DialogProvider>
          <UserProvider>
            <MealProvider>
              <App />
            </MealProvider>
          </UserProvider>
        </DialogProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
