import React from "react";
import { Center, Modal, Spinner } from "native-base";
import Text from "./Text";

export default function Loader({ isOpen, onClose, text }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="150" maxH="112">
        <Modal.Body>
          <Center>
            <Spinner size={"lg"} color="indigo.500" />
            {text ? (
              <Text style={"mt-2"}>{text}</Text>
            ) : (
              <Text style={"mt-2"}>Loading...</Text>
            )}
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
