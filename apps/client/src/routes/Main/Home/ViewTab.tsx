import {
  useTab,
  useMultiStyleConfig,
  Button,
  useToken,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";

export default React.forwardRef(function ViewTab(
  props: {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: React.ComponentType<any>;
  },
  ref: React.Ref<HTMLElement>
) {
  const tabProps = useTab({ ...props, ref });
  const styles = useMultiStyleConfig("Tabs", tabProps);

  return (
    <Button
      __css={styles.tab}
      {...tabProps}
      roundedTop={"lg"}
      _hover={{
        bg: useToken("colors", "primary.500") + "22",
      }}
    >
      <Flex gap={2} align={"center"}>
        <Icon as={props.icon} boxSize={4} />
        {props.children}
      </Flex>
    </Button>
  );
});
