import { Button } from "@chakra-ui/react";

export default function AddCardButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            colorScheme="green"
            w={"80%"}
            mt={2}
            onClick={onClick}
        >
            Добавить
        </Button>
    );
}
