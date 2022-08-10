import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default () => {
  return (
    <Flex direction={"row"} width="full" p={5}>
      <Outlet />
    </Flex>
  );
};
