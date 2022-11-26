import { Route, Routes, Navigate } from "react-router-dom";
import App from "../App/App";
import Landing from "../../routes/Landing/Landing";
import Main from "../../routes/Main/Main";
import Home from "../../routes/Main/Home";
import Settings from "../../routes/Main/Settings";
import Barcodes from "../../routes/Main/Barcodes";
import General from "../../routes/Main/Settings/General";
import Developers from "../../routes/Main/Settings/Developers";
import About from "../../routes/Main/Settings/About";
import Announcements from "../../routes/Main/Announcements";
import Empty from "../Empty";
import { SmileyXEyes } from "phosphor-react";

const PageNotFound = () => (
  <Empty
    icon={SmileyXEyes}
    heading={"Page not found"}
    text={"Sorry, we couldn't find the page you were looking for."}
    colour={"primary.500"}
    size={"xl"}
  />
);

export default () => (
  <Routes>
    <Route path={"/"} element={<App />}>
      <Route index element={<Landing />} />
      <Route path={"app"} element={<Main />}>
        <Route index element={<Home />} />
        <Route path={"settings/*"} element={<Settings />}>
          <Route path={"general"} element={<General />} />
          <Route path={"developers"} element={<Developers />} />
          <Route path={"about"} element={<About />} />
          <Route index element={<Navigate to="general" replace={true} />} />
        </Route>
        <Route path={"barcodes"} element={<Barcodes />} />
        <Route path={"announcements"} element={<Announcements />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);
