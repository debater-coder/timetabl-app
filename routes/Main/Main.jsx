import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import SidebarButton from "../../components/Sidebar/SidebarButton";

import { Calendar, House, Megaphone } from "phosphor-react";
import Sidebar from "../../components/Sidebar";

export default () => {
  const { loggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loggedIn) {
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
        <Skeleton mt={10} rounded={10} isLoaded={!loading}>
          G'day, user! You are now logged in.
        </Skeleton>
      </Flex>
    </Flex>
  );
};
