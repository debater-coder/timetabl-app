import { Barcode, CalendarBlank, House, IconWeight } from "phosphor-react";
import Announcements from "./routes/Main/Announcements";
import Barcodes from "./routes/Main/Barcodes";
import { Calendar } from "./routes/Main/Calendar";
import Home from "./routes/Main/Home";

export type TimetablRoute = {
  path: string;
  name: string;
  icon: React.JSXElementConstructor<
    React.PropsWithChildren<{
      size: string | number;
      mirrored: boolean;
      weight: IconWeight;
    }>
  >;
  mirrored: boolean;
  element: JSX.Element;
};

export const routes: TimetablRoute[] = [
  {
    path: "home",
    name: "Home",
    icon: House,
    mirrored: false,
    element: <Home />,
  },
  {
    path: "barcodes",
    name: "Barcodes",
    icon: Barcode,
    mirrored: false,
    element: <Barcodes />,
  },
  {
    path: "announcements",
    name: "Notices",
    icon: House,
    mirrored: false,
    element: <Announcements />,
  },
  {
    path: "calendar",
    name: "Calendar",
    icon: CalendarBlank,
    mirrored: false,
    element: <Calendar />,
  },
];
