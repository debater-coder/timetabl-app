import { Route, Routes, Navigate } from "react-router-dom";
import App from "../App/App";
import Home from "../../routes/Main/Home";
import Settings from "../../routes/Main/Settings";
import Barcodes from "../../routes/Main/Barcodes";
import General from "../../routes/Main/Settings/General";
import Developers from "../../routes/Main/Settings/Developers";
import About from "../../routes/Main/Settings/About";
import Announcements from "../../routes/Main/Announcements";
import Empty from "../Empty";
import { SmileyXEyes } from "phosphor-react";
import { lazy, ReactNode, Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

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
        <Route index element={<Home />} />
        <Route path={"settings/*"} element={<Settings />}>
          <Route path={"general"} element={<General />} />
          <Route path={"developers"} element={<Developers />} />
          <Route path={"about"} element={<About />} />
          <Route index element={<Navigate to="general" replace={true} />} />
        </Route>
        <Route path={"barcodes"} element={<Barcodes />} />
        <Route path={"announcements"} element={<Announcements />} />
        <Route path="*" element={<PageNotFound />} status={404} />
      </Route>
      <Route path="*" element={<PageNotFound />} status={404} />
    </Route>
  </Routes>
);
