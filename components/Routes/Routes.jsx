import { Route, Routes, Navigate } from "react-router-dom";
import App from "../App/App";
import Landing from "../../routes/Landing/Landing";
import Main from "../../routes/Main/Main";
import Home from "../../routes/Main/Home";
import Settings from "../../routes/Main/Settings";
import Barcodes from "../../routes/Main/Barcodes";
import Appearance from "../../routes/Main/Settings/Appearance";
import Developers from "../../routes/Main/Settings/Developers";
import About from "../../routes/Main/Settings/About";
import Profile from "../../routes/Main/Profile";

export default () => (
  <Routes>
    <Route path={"/"} element={<App />}>
      <Route index element={<Landing />} />
      <Route path={"app"} element={<Main />}>
        <Route index element={<Home />} />
        <Route path={"settings/*"} element={<Settings />}>
          <Route path={"appearance"} element={<Appearance />} />
          <Route path={"developers"} element={<Developers />} />
          <Route path={"about"} element={<About />} />
          <Route index element={<Navigate to="appearance" replace={true} />} />
        </Route>
        <Route path={"barcodes"} element={<Barcodes />} />
        <Route path={"profile"} element={<Profile />} />
      </Route>
    </Route>
  </Routes>
);
