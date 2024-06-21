import SpinnerSuspense from "../../components/SpinnerSuspense";
import {
  Barcode,
  ChatsTeardrop,
  House,
  IconWeight,
  MapTrifold,
  Medal,
  Megaphone,
} from "phosphor-react";
import React from "react";

const ComingSoon = () => <>Coming soon...</>;

const Page = ({ component }: { component: ReturnType<typeof React.lazy> }) => {
  const Comp = component;

  return (
    <SpinnerSuspense>
      <Comp />
    </SpinnerSuspense>
  );
};

type TimetablPage = {
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

export const pages: { pinned: TimetablPage[]; unpinned: TimetablPage[] } = {
  pinned: [
    {
      path: "home",
      name: "Home",
      icon: House,
      mirrored: false,
      element: (
        <Page component={React.lazy(() => import("../../routes/Main/Home"))} />
      ),
    },
    {
      path: "barcodes",
      name: "Barcodes",
      icon: Barcode,
      mirrored: false,
      element: (
        <Page
          component={React.lazy(() => import("../../routes/Main/Barcodes"))}
        />
      ),
    },
    {
      path: "announcements",
      name: "Notices",
      icon: Megaphone,
      mirrored: true,
      element: (
        <Page
          component={React.lazy(
            () => import("../../routes/Main/Announcements")
          )}
        />
      ),
    },
  ],
  unpinned: [
    {
      path: "feedback",
      name: "Feedback",
      icon: ChatsTeardrop,
      mirrored: false,
      element: (
        <Page
          component={React.lazy(() => import("../../routes/Main/Feedback"))}
        />
      ),
    },
  ],
};
