import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/Sidebar";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export default () => {
  const { loggedIn, shouldRedirect } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loggedIn && shouldRedirect) {
      navigate("/");
    }
  }, [loggedIn, shouldRedirect, navigate]);

  return (
    <Flex
      align={"center"}
      width={"full"}
      height={"full"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Sidebar
        pathname={pathname}
        sidebar={useBreakpointValue({ base: false, md: true })}
      />
      <Flex
        direction={"column"}
        align={"center"}
        width={"full"}
        height={"full"}
        maxH={{ base: "calc(100% - 64px)", md: "100%" }}
        mb={{ base: "64px", md: 0 }}
        maxW={{ base: "100%", md: "calc(100% - 144px)" }}
        ml={{ base: 0, md: "144px" }}
        overflowY={"auto"}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Flex>
    </Flex>
  );
};
