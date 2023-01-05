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
import React from "react";
import { LoaderFunction } from "react-router-dom";
import SpinnerSuspense from "./components/SpinnerSuspense";
import * as Home from "./routes/Main/Home/Home";
import * as Barcodes from "./routes/Main/Barcodes/Barcodes";
import * as Announcements from "./routes/Main/Announcements/Announcements";

const ComingSoon = () => <>Coming soon...</>;

const Page = ({ component }: { component: ReturnType<typeof React.lazy> }) => {
  const Comp = component;

  return (
    <SpinnerSuspense>
      <Comp />
    </SpinnerSuspense>
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
      element: (
        <Page component={React.lazy(() => import("./routes/Main/Barcodes/"))} />
      ),
      loader: Barcodes.loader,
    },
    {
      path: "announcements",
      name: "Notices",
      icon: Megaphone,
      mirrored: true,
      element: (
        <Page
          component={React.lazy(() => import("./routes/Main/Announcements/"))}
        />
      ),
      loader: Announcements.loader,
    },
    {
      path: "calendar",
      name: "Calendar",
      icon: CalendarBlank,
      mirrored: false,
      element: (
        <Page component={React.lazy(() => import("./routes/Main/Calendar/"))} />
      ),
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
      element: (
        <Page
          component={React.lazy(() => import("./routes/Main/Publications/"))}
        />
      ),
    },
    {
      path: "feedback",
      name: "Feedback",
      icon: ChatsTeardrop,
      mirrored: false,
      element: (
        <Page component={React.lazy(() => import("./routes/Main/Feedback/"))} />
      ),
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
