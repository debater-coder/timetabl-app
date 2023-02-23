import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./components/App/App";
import Settings from "./routes/Main/Settings";
import General from "./routes/Main/Settings/General";
import Developers from "./routes/Main/Settings/Developers";
import About from "./routes/Main/Settings/About";
import Empty from "./components/Empty";
import { SmileyXEyes } from "phosphor-react";
import { lazy } from "react";
import { pages } from "./pages";
import ErrorAlert from "./components/ErrorAlert.tsx";
import { QueryClient } from "@tanstack/react-query";
import SpinnerSuspense from "./components/SpinnerSuspense";

const Main = lazy(() => import("./routes/Main"));
const Landing = lazy(() => import("./routes/Landing"));

const PageNotFound = () => (
  <Empty
    icon={SmileyXEyes}
    heading={"Page not found"}
    text={"Sorry, we couldn't find the page you were looking for."}
    colour={"primary.500"}
    size={"xl"}
  />
);

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path={"/"} element={<App />} errorElement={<ErrorAlert />}>
        <Route
          index
          element={
            <SpinnerSuspense>
              <Landing />
            </SpinnerSuspense>
          }
        />
        <Route
          path={"app"}
          element={
            <SpinnerSuspense>
              <Main />
            </SpinnerSuspense>
          }
          errorElement={<ErrorAlert />}
        >
          <Route index element={<Navigate to="home" replace={true} />} />
          {[...pages.pinned, ...pages.unpinned].map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
              errorElement={<ErrorAlert />}
            />
          ))}
          <Route
            path={"settings/*"}
            element={<Settings />}
            errorElement={<ErrorAlert />}
          >
            <Route
              path={"general"}
              element={<General />}
              errorElement={<ErrorAlert />}
            />
            <Route
              path={"developers"}
              element={<Developers />}
              errorElement={<ErrorAlert />}
            />
            <Route
              path={"about"}
              element={<About />}
              errorElement={<ErrorAlert />}
            />
            <Route
              index
              element={<Navigate to="general" replace={true} />}
              errorElement={<ErrorAlert />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
