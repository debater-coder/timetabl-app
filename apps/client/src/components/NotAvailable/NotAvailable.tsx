import Empty from "../Empty";
import { SmileyXEyes } from "phosphor-react";

export default function NotAvailable() {
  return (
    <Empty
      icon={SmileyXEyes}
      heading={"Not available"}
      text={"Sorry, this page is not enabled for your school."}
      colour={"primary.500"}
      size={"xl"}
    />
  );
}
