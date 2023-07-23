import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { BottomNav } from "../../components/BottomNav";
import { useIsLoggedIn } from "../../stores/auth";

export default function Main() {
  const navigate = useNavigate();
  const loggedIn = useIsLoggedIn();
  const isLargerThanMd = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Flex
      align={"center"}
      width={"full"}
      height={"full"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      {isLargerThanMd ? <Sidebar /> : <BottomNav />}
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
}
