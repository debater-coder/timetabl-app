import { QueryClient } from "@tanstack/react-query";
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
import React, { Suspense } from "react";
import { LoaderFunction } from "react-router-dom";
import Announcements from "./routes/Main/Announcements";
import Barcodes from "./routes/Main/Barcodes";
import Calendar from "./routes/Main/Calendar";
import Feedback from "./routes/Main/Feedback";
import * as Home from "./routes/Main/Home/Home";
import Publications from "./routes/Main/Publications";

const ComingSoon = () => <>Coming soon...</>;

const Page = ({ component }: { component: ReturnType<typeof React.lazy> }) => {
  const Comp = component;

  return (
    <Suspense>
      <Comp />
    </Suspense>
  );
};

export type TimetablPage = {
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
  loader?: (queryClient: QueryClient) => LoaderFunction;
};

export const pages: { pinned: TimetablPage[]; unpinned: TimetablPage[] } = {
  pinned: [
    {
      path: "home",
      name: "Home",
      icon: House,
      mirrored: false,
      element: (
        <Page component={React.lazy(() => import("./routes/Main/Home/"))} />
      ),
      loader: Home.loader,
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
      element: <Publications />,
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
