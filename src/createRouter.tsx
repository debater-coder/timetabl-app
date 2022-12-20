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
import { lazy, ReactNode, Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { pages } from "./pages";
import QueryError from "./components/QueryError";

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

const SpinnerSuspense = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Flex w="full" h="full" align={"center"} justify="center">
        <Spinner size="xl" />
      </Flex>
    }
  >
    {children}
  </Suspense>
);

export const createRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={"/"}
        element={<App />}
        errorElement={<QueryError error={{ message: "error" }} />}
      >
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
          errorElement={<QueryError error={{ message: "error" }} />}
        >
          <Route index element={<Navigate to="home" replace={true} />} />
          {[...pages.pinned, ...pages.unpinned].map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
              errorElement={<QueryError error={{ message: "error" }} />}
            />
          ))}
          <Route
            path={"settings/*"}
            element={<Settings />}
            errorElement={<QueryError error={{ message: "error" }} />}
          >
            <Route
              path={"general"}
              element={<General />}
              errorElement={<QueryError error={{ message: "error" }} />}
            />
            <Route
              path={"developers"}
              element={<Developers />}
              errorElement={<QueryError error={{ message: "error" }} />}
            />
            <Route
              path={"about"}
              element={<About />}
              errorElement={<QueryError error={{ message: "error" }} />}
            />
            <Route
              index
              element={<Navigate to="general" replace={true} />}
              errorElement={<QueryError error={{ message: "error" }} />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
