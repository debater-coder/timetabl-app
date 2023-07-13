import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarButton from "../Sidebar/SidebarButton";
import { pages } from "../../pages";
import { DotsThree } from "phosphor-react";

export const BottomNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      w={"100%"}
      position={"fixed"}
      align="center"
      justify="flex-start"
      bottom={0}
      left={0}
      zIndex={100}
      bg={useColorModeValue("gray.50", "gray.900")}
      border={"1px"}
      borderBottom="none"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      {pages.pinned.map((routes) => (
        <SidebarButton
          key={routes.path}
          name={routes.name}
          icon={routes.icon}
          mirrored={routes.mirrored}
          to={`/app/${routes.path}`}
        />
      ))}
      <SidebarButton name={"More"} icon={DotsThree} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg={useColorModeValue("whiteAlpha.600", "blackAlpha.600")}
          backdropFilter="auto"
          backdropBlur="36px"
          roundedTop="2xl"
          border={"1px"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <DrawerCloseButton />
          <DrawerHeader fontFamily={"Poppins, sans-serif"}>
            More features
          </DrawerHeader>

          <SimpleGrid columns={4} w="full">
            {pages.unpinned.map((routes) => (
              <SidebarButton
                key={routes.path}
                name={routes.name}
                icon={routes.icon}
                mirrored={routes.mirrored}
                to={`/app/${routes.path}`}
                onClick={close}
              />
            ))}
          </SimpleGrid>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
