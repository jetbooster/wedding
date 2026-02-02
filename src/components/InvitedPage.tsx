import { FC, RefObject } from "react";
import Details from "./details/Details";
import { Form } from "./form/Form";
import { useTranslation } from "react-i18next";

interface InvitedPageProps {
  ref: RefObject<HTMLDivElement | null>;
}

const InvitedPage: FC<InvitedPageProps> = ({ ref }) => {
  const { t } = useTranslation();
  return (
    <div className="app">
      <div className="imageLeft" />
      <div className="imageRight" />
      <div className="appear" ref={ref}>
        <h1 className="fancy">{t("invited.1")}</h1>
        <p className="fancy">{t("invited.2")}</p>
        <p className="fancy">Claudine Julie Richardson</p>
        <p className="fancy">{t("invited.3")}</p>
        <p className="fancy">Samuel Andrew Jarvis</p>
        <Details />
        <Form />
      </div>
    </div>
  );
};

export default InvitedPage;
