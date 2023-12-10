import releaseNotes from "../../../RELEASE_NOTES.md?raw";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { micromark } from "micromark";

type ReleaseNotesProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReleaseNotes(props: ReleaseNotesProps) {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Release Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Prose>
            <div
              dangerouslySetInnerHTML={{ __html: micromark(releaseNotes) }}
            />
          </Prose>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
