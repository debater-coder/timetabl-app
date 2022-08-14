import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Barcode, House, User } from "phosphor-react";

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
    <Link to={"/app/profile"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Profile"}
        active={pathname === "/app/profile"}
        icon={User}
      />
    </Link>
  </>
);
