import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ResponsiveValue } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    size: ResponsiveValue<string> | undefined;
    children: ReactNode | ReactNode[];
};

export default function EditorModal({ isOpen, onClose, size, children }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Изменение данных</ModalHeader>
                <ModalCloseButton />

                <ModalBody>{children}</ModalBody>

                <ModalFooter />
            </ModalContent>
        </Modal>
    );
}
// TODO сделать закрытие модального окна при удалении сущности
