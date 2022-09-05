import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/Sidebar";

export default () => {
  const { loggedIn, shouldRedirect } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loggedIn && shouldRedirect) {
      navigate("/");
    }
  }, [loggedIn, shouldRedirect]);

  return (
    <Flex
      align={"center"}
      width={"full"}
      height={"full"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Flex
        w={{ base: "100%", md: "80px" }}
        h={{ base: "80px", md: "100%" }}
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
        maxH={{ base: "calc(100% - 80px)", md: "100%" }}
        mb={{ base: "80px", md: 0 }}
        maxW={{ base: "100%", md: "calc(100% - 80px)" }}
        ml={{ base: 0, md: "80px" }}
        overflowY={"auto"}
        bg={localStorage.getItem("debug") === "true" && "orange"}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};
