import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../../routes/Landing";
import Main from "../../routes/Main";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/app"} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
