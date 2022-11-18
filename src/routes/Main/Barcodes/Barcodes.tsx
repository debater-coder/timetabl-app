import {
  Tooltip,
  Icon,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import "@fontsource/poppins";
import { useState } from "react";
import { get, update } from "idb-keyval";
import { Barcode as BarcodeIcon } from "phosphor-react";
import SavedBarcode from "./SavedBarcode";
import YourBarcode from "./YourBarcode";
import SaveBarcodeForm from "./SaveBarcodeForm";
import Empty from "../../../components/Empty";

export type Barcode = {
  name: string;
  value: string;
};

export default () => {
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);

  const addBarcode = async (name: string, value: string) => {
    setBarcodes((barcodes) => [...barcodes, { name, value }]);
    await update("barcodes", (barcodes) => {
      if (!barcodes) {
        return [
          {
            name,
            value,
          },
        ];
      }
      return [...barcodes, { name, value }];
    });
  };

  const getBarcodes = async () => {
    const newBarcodes = await get("barcodes");
    setBarcodes(newBarcodes ?? []);
  };

  const deleteBarcode = async (name: string) => {
    setBarcodes((barcodes) =>
      barcodes.filter((barcode) => barcode.name !== name)
    );
    await update("barcodes", (barcodes: Barcode[]) =>
      barcodes.filter((barcode) => barcode.name !== name)
    );
  };

  getBarcodes();

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
      <YourBarcode />
      <Flex align="center" mt={6}>
        <Heading fontFamily={"Poppins, sans-serif"} fontSize="xl" mr={3}>
          Saved barcodes
        </Heading>
        <Tooltip
          label={
            "You can save your own barcodes here if you need to create a barcode with a custom value. Enter the name and value, then click the 'Add Barcode' button to save it. For a student barcode, you enter the student ID as the value."
          }
          closeOnClick={false}
        >
          <Icon
            boxSize={7}
            color={useColorModeValue("primary.500", "primary.300")}
          />
        </Tooltip>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        gap={3}
        mb={{ base: 80, md: 60 }}
      >
        {barcodes.length > 0 ? (
          barcodes.map(({ name, value }) => (
            <SavedBarcode
              name={name}
              value={value}
              key={name}
              onDelete={deleteBarcode}
            />
          ))
        ) : (
          <Empty
            icon={BarcodeIcon}
            colour="primary.500"
            heading="You have no saved barcodes."
            size="xl"
            text={
              <>
                Type in a name for your barcode and its value, then click the{" "}
                <b>Add Barcode</b> button to save it.
              </>
            }
          />
        )}
      </Flex>
      <Flex
        direction={"column"}
        position={"fixed"}
        bottom={{ base: 20, md: 0 }}
        bg={useColorModeValue("gray.200", "gray.700")}
        p={4}
        roundedTop={10}
        shadow={"outline"}
      >
        <SaveBarcodeForm addBarcode={addBarcode} barcodes={barcodes} />
      </Flex>
    </Flex>
  );
};
