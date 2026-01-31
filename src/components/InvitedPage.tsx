import { FC, RefObject } from "react";
import Details from "./Details";
import { Form } from "./Form";

interface InvitedPageProps {
  ref: RefObject<HTMLDivElement | null>;
}

const InvitedPage: FC<InvitedPageProps> = ({ ref }) => (
  <div className="app">
    <div className="imageLeft" />
    <div className="imageRight" />
    <div className="appear" ref={ref}>
      <h1 className="fancy">You&apos;re Invited!</h1>
      <p className="fancy">To the Wedding of</p>
      <p className="fancy">Claudine Julie Richardson</p>
      <p className="fancy">&</p>
      <p className="fancy">Samuel Andrew Jarvis</p>
      <Details />
      <Form />
    </div>
  </div>
);

export default InvitedPage;
