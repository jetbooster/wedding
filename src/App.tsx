import { useContext, useEffect, useRef } from "react";
import InvitedPage from "./components/InvitedPage";
import { MessageDialog } from "./components/MessageDialog";
import NotInvitedPage from "./components/NotInvitedPage";
import { UserContext } from "./context/UserContext";
import "./index.css";
import LanguageChanger from "./components/LanguageChanger";

export function App() {
  const { user, loading } = useContext(UserContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = 750;
    const curr = ref.current;
    const children = Array(...(curr?.children || []));
    if (!localStorage.getItem("animation complete")) {
      for (const [index, val] of children.entries()) {
        setTimeout(() => {
          val.classList.add("fade-in");
        }, index * interval);
        if (
          index === (curr?.children.length ?? 999) - 1 &&
          curr?.getAttribute("data-main")
        ) {
          localStorage.setItem("animation complete", "true");
        }
      }
    } else {
      for (const [, val] of children.entries()) {
        val.classList.add("fade-in");
      }
    }
  });

  return (
    <>
      <LanguageChanger />
      {loading ? undefined : user ? (
        <InvitedPage ref={ref} />
      ) : (
        <NotInvitedPage ref={ref} />
      )}
      <MessageDialog />
    </>
  );
}

export default App;
