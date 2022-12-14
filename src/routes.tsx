import { Barcode, CalendarBlank, House, IconWeight } from "phosphor-react";

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
};

export const routes: TimetablRoute[] = [
  {
    path: "/app",
    name: "Home",
    icon: House,
    mirrored: false,
  },
  {
    path: "/app/barcodes",
    name: "Barcodes",
    icon: Barcode,
    mirrored: false,
  },
  {
    path: "/app/announcements",
    name: "Notices",
    icon: House,
    mirrored: false,
  },
  {
    path: "/app/calendar",
    name: "Calendar",
    icon: CalendarBlank,
    mirrored: false,
  },
];
