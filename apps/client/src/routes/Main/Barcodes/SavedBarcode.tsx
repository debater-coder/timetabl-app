import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowsOutSimple, Download } from "phosphor-react";
import { useRef } from "react";
import Barcode from "../../../components/Barcode";
import useDownloadBarcode from "../../../hooks/useDownloadBarcode";

export default ({
  name,
  value,
  onDelete,
  readOnly = false,
}: {
  name: string;
  value: string;
  onDelete?: (name: string) => void;
  readOnly?: boolean;
}) => {
  const wakeLock = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLock.current = await navigator.wakeLock.request("screen");
        } catch (err) {
          console.error(`${err.name}, ${err.message}`);
        }
      }
    },
    onClose: () => {
      wakeLock.current.release();
      wakeLock.current = null;
    },
  });

  return (
    <>
      <Flex direction="column" align={"center"}>
        <Flex justify={"space-between"} align="center" mb={1} w="full">
          <Heading size={"sm"} fontFamily={"Poppins, sans-serif"}>
            {name}
          </Heading>
          <Flex align={"center"} mb={2}>
            <IconButton
              variant={"outline"}
              ml={2}
              icon={<ArrowsOutSimple size={20} />}
              onClick={onOpen}
              aria-label="Fullscreen"
            />
            <IconButton
              variant={"outline"}
              mx={2}
              icon={<Download />}
              onClick={() => useDownloadBarcode(value)}
              aria-label="Download"
            />
            {!readOnly && <CloseButton onClick={() => onDelete(name)} />}
          </Flex>
        </Flex>
        <Barcode value={value} />
      </Flex>
      <Modal
        isOpen={isOpen}
        blockScrollOnMount={false}
        onClose={onClose}
        isCentered
        size={"xs"}
      >
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              align="center"
              direction={"column"}
              justify="center"
              h="full"
              w="full"
            >
              <Barcode value={value} />
            </Flex>
            <Alert status="info" rounded={6} mt={2}>
              <AlertIcon />
              <Box>
                <AlertTitle>Tip!</AlertTitle>
                <AlertDescription>
                  On mobile you can pinch the screen to zoom, and your phone
                  will not go to sleep while you are in this fullscreen mode
                </AlertDescription>
              </Box>
            </Alert>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
