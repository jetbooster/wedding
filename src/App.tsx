import { useContext, useEffect, useRef } from "react";
import InvitedPage from "./components/InvitedPage";
import { MessageDialog } from "./components/MessageDialog";
import NotInvitedPage from "./components/NotInvitedPage";
import { UserContext } from "./context/UserContext";
import "./index.css";

export function App() {
  const { user, loading } = useContext(UserContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = 750;
    const curr = ref.current;
    for (const [index, val] of Array(...(curr?.children || [])).entries()) {
      setTimeout(() => {
        val.classList.add("fade-in");
      }, index * interval);
    }
  });

  return (
    <>
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
