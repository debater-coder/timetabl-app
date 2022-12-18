import { Route, Routes, Navigate } from "react-router-dom";
import App from "../App/App";
import Settings from "../../routes/Main/Settings";
import General from "../../routes/Main/Settings/General";
import Developers from "../../routes/Main/Settings/Developers";
import About from "../../routes/Main/Settings/About";
import Empty from "../Empty";
import { SmileyXEyes } from "phosphor-react";
import { lazy, ReactNode, Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { routes } from "../../routes";

const Main = lazy(() => import("../../routes/Main"));
const Landing = lazy(() => import("../../routes/Landing"));

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

export default () => (
  <Routes>
    <Route path={"/"} element={<App />}>
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
      >
        <Route index element={<Navigate to="home" replace={true} />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path={"settings/*"} element={<Settings />}>
          <Route path={"general"} element={<General />} />
          <Route path={"developers"} element={<Developers />} />
          <Route path={"about"} element={<About />} />
          <Route index element={<Navigate to="general" replace={true} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);
