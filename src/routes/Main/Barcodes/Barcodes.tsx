import {
  Tooltip,
  Icon,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import YourBarcode from "./YourBarcode";
import { createLoader } from "../../../utils/createLoader";
import { profileQuery, useProfile } from "../../../services/sbhsApi/useProfile";
import { useLoaderData } from "react-router-dom";
import { ApiProfile } from "../../../services/sbhsApi/types";

export type Barcode = {
  name: string;
  value: string;
};

export const loader = createLoader({ queryHook: profileQuery });

export default () => {
  const { data, isLoading } = useProfile({
    initialData: (useLoaderData() as [ApiProfile])[0],
  });

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
