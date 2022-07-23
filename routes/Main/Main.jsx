import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
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
  }, [loggedIn]);

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
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};
