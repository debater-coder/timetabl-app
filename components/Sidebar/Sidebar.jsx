import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Calendar, House, Megaphone } from "phosphor-react";
import React from "react";

export default ({ pathname, sidebar }) => (
  <>
    <Link to={"/app"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Home"}
        active={pathname === "/app"}
        icon={House}
      />
    </Link>
  </>
);
