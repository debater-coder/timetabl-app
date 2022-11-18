import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Barcode, House, Megaphone } from "phosphor-react";

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
    <Link to={"/app/barcodes"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Barcodes"}
        active={pathname === "/app/barcodes"}
        icon={Barcode}
      />
    </Link>
    <Link to={"/app/announcements"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Announcements"}
        active={pathname === "/app/announcements"}
        icon={Megaphone}
        mirrored
      />
    </Link>
  </>
);
