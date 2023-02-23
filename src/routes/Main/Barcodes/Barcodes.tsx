import {
  Tooltip,
  Icon,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import YourBarcode from "./YourBarcode";
import { useProfile } from "../../../services/sbhsApi/useProfile";

export type Barcode = {
  name: string;
  value: string;
};

export default () => {
  const { data, isLoading } = useProfile();

  return (
    <Flex direction={"column"} gap={3} align="center" textAlign={"center"}>
      <Flex align="center" gap={3}>
        <Heading fontSize={"xl"} fontFamily={"Poppins, sans-serif"}>
          Your scan in barcode
        </Heading>
        <Tooltip
          label={
            "You can use this barcode to scan in with your phone or click the button on the right to download the barcode. If you are scanning using your phone, click the fullscreen icon and you must use the new scanners, like the ones outside the 600s or the ones outside Main Foyer opposite the Main Office."
          }
          closeOnClick={false}
        >
          <Icon
            boxSize={7}
            color={useColorModeValue("primary.500", "primary.300")}
          />
        </Tooltip>
      </Flex>
      <YourBarcode {...{ data, isLoading }} />
    </Flex>
  );
};
