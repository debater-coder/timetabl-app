import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Barcode, House } from "phosphor-react";

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
    <Link to={"/app/barcode"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Barcode"}
        active={pathname === "/app/barcode"}
        icon={Barcode}
      />
    </Link>
  </>
);
