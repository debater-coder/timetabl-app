import { log } from "../../utils/log";
import { Flex, Spinner, Icon, Tooltip } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";
import { CloudCheck, WifiX } from "phosphor-react";
import { useState } from "react";

export default function RefetchingIndicator() {
  const isFetching = useIsFetching();
  const [online, setOnline] = useState(true);

  document.addEventListener("onlinechange", ({ detail: { online } }) => {
    log(`Online status change detected - Online: ${online}`);
    return setOnline(online);
  });

  return (
    <Flex p={2} rounded="full" align={"center"} gap={3}>
      {online ? (
        isFetching ? (
          <Tooltip label="Fetching the latest data." closeOnClick={false}>
            <Spinner size={"xs"} />
          </Tooltip>
        ) : (
          <Tooltip
            label="Timetabl will automagically check for the latest data."
            closeOnClick={false}
          >
            <Icon as={CloudCheck} />
          </Tooltip>
        )
      ) : (
        <Tooltip
          label="Can't reach the server right now, check your modem or router connection."
          closeOnClick={false}
        >
          <Icon as={WifiX} />
        </Tooltip>
      )}
    </Flex>
  );
}
