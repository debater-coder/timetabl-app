import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Calendar, House, Megaphone } from "phosphor-react";
import React from "react";

export default ({ pathname, sidebar }) => (
  <>
    <Link to={"/app/calendar"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Calendar"}
        active={pathname === "/app/calendar"}
        icon={Calendar}
      />
    </Link>
    <Link to={"/app"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Home"}
        active={pathname === "/app"}
        icon={House}
      />
    </Link>
    <Link to={"/app/notices"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Notices"}
        icon={Megaphone}
        mirrored
        active={pathname === "/app/notices"}
      />
    </Link>
  </>
);
