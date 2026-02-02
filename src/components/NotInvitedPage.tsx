import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC, FormEventHandler, RefObject, useContext, useState } from "react";
import { OutlinedInput } from "./form/OutlinedInput";
import { Button } from "@mui/material";
import { UserContext } from "@/context/UserContext";
import { getUserByName } from "@/api_calls";
import { DialogContext } from "@/context/DialogContext";
import { Trans, useTranslation } from "react-i18next";

interface NotInvitedPageProps {
  ref: RefObject<HTMLDivElement | null>;
}

const NotInvitedPage: FC<NotInvitedPageProps> = ({ ref }) => {
  const { t } = useTranslation();
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
        setContent({
          message: t(error.message, { keyPrefix: "invited.error" }),
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="app">
      <div className="appear" ref={ref}>
        <Trans
          i18nKey="invited.maybe"
          components={{
            1: <h1 className="fancy" />,
            2: <Typography display="inline" component="span" fontSize={40} />,
          }}
        >
          <h1 className="fancy">
            You&apos;re{" "}
            <Typography display="inline" component="span" fontSize={40}>
              (maybe)
            </Typography>{" "}
            Invited?
          </h1>
        </Trans>
        <p className="fancy">{t("invited.2")}</p>
        <p className="fancy">Claudine Julie Richardson</p>
        <p className="fancy">{t("invited.3")}</p>
        <p className="fancy">Samuel Andrew Jarvis</p>
      </div>
      <Paper sx={{ padding: "1em", marginTop: "1.5em" }}>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography>{t("invited.query")}</Typography>
          <OutlinedInput
            fullWidth
            id="first-name"
            placeholder={t("invited.firstPlaceholder")}
            onChange={(e) => setFirst(e.target.value)}
          />
          <OutlinedInput
            fullWidth
            id="last-name"
            placeholder={t("invited.lastPlaceholder")}
            onChange={(e) => setLast(e.target.value)}
          />
          <Button fullWidth variant="contained" loading={loading} type="submit">
            {t("button.submit")}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default NotInvitedPage;
