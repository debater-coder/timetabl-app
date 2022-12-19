import {
  Barcode,
  BookBookmark,
  CalendarBlank,
  ChatsTeardrop,
  House,
  IconWeight,
  MapTrifold,
  Medal,
  Megaphone,
  Palette,
} from "phosphor-react";
import Announcements from "./routes/Main/Announcements";
import Barcodes from "./routes/Main/Barcodes";
import { Calendar } from "./routes/Main/Calendar";
import { Feedback } from "./routes/Main/Feedback";
import Home from "./routes/Main/Home";

const ComingSoon = () => <>Coming soon...</>;

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

export const routes: { pinned: TimetablRoute[]; unpinned: TimetablRoute[] } = {
  pinned: [
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
      icon: Megaphone,
      mirrored: true,
      element: <Announcements />,
    },
    {
      path: "calendar",
      name: "Calendar",
      icon: CalendarBlank,
      mirrored: false,
      element: <Calendar />,
    },
  ],
  unpinned: [
    {
      path: "maps",
      name: "Maps",
      icon: MapTrifold,
      mirrored: false,
      element: <ComingSoon />,
    },
    {
      path: "points",
      name: "Points",
      icon: Medal,
      mirrored: false,
      element: <ComingSoon />,
    },
    {
      path: "publications",
      name: "Publications",
      icon: BookBookmark,
      mirrored: false,
      element: <ComingSoon />,
    },
    {
      path: "feedback",
      name: "Feedback",
      icon: ChatsTeardrop,
      mirrored: false,
      element: <Feedback />,
    },

    {
      path: "themes",
      name: "Themes",
      icon: Palette,
      mirrored: false,
      element: <ComingSoon />,
    },
  ],
};
