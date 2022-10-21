import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/Sidebar";
import { prefetchQuery } from "../../hooks/useSBHSQuery";
import { useQueryClient } from "@tanstack/react-query";

export default () => {
  const { loggedIn, shouldRedirect, refresh } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

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
      <Flex
        minW={"fit-content"}
        w={{ base: "100%", md: "auto" }}
        h={{ base: "auto", md: "100%" }}
        direction={{ base: "row", md: "column" }}
        justify={"center"}
        position={"fixed"}
        bottom={0}
        left={0}
        zIndex={100}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Sidebar
          pathname={pathname}
          sidebar={useBreakpointValue({ base: false, md: true })}
        />
      </Flex>
      <Flex
        direction={"column"}
        align={"center"}
        width={"full"}
        height={"full"}
        maxH={{ base: "calc(100% - 64px)", md: "100%" }}
        mb={{ base: "64px", md: 0 }}
        maxW={{ base: "100%", md: "calc(100% - 128px)" }}
        ml={{ base: 0, md: "128px" }}
        overflowY={"auto"}
        bg={localStorage.getItem("debug") === "true" && "orange"}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};
