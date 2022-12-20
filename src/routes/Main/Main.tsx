import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/Sidebar";
import { BottomNavSheet } from "../../components/BottomNavSheet";

export default () => {
  const { loggedIn, shouldRedirect } = useAuth();
  const navigate = useNavigate();
  const isLargerThanMd = useBreakpointValue({ base: false, md: true });

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
      {isLargerThanMd ? <Sidebar /> : <BottomNavSheet />}
      <Flex
        direction={"column"}
        align={"center"}
        width={"full"}
        height={"full"}
        maxH={{ base: "calc(100% - 64px)", md: "100%" }}
        mb={{ base: "64px", md: 0 }}
        maxW={{ base: "100%", md: "calc(100% - 100px)" }}
        ml={{ base: 0, md: "100px" }}
        overflowY={"auto"}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};
