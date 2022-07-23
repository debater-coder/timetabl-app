import { Route, Routes } from "react-router-dom";
import App from "../App/App";
import Landing from "../../routes/Landing/Landing";
import Main from "../../routes/Main/Main";
import Home from "../../routes/Main/Home";
import Settings from "../../routes/Main/Settings";

export default () => (
  <Routes>
    <Route path={"/"} element={<App />}>
      <Route index element={<Landing />} />
      <Route path={"app"} element={<Main />}>
        <Route index element={<Home />} />
        <Route path={"settings"} element={<Settings />} />
      </Route>
    </Route>
  </Routes>
);
