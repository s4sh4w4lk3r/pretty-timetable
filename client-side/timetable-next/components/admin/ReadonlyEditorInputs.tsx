import { HStack, Input, Text } from "@chakra-ui/react";

export default function ReadonlyEditorInputs({ id, modifiedAt }: { id: number; modifiedAt: Date }) {
    return (
        <HStack w={"full"}>
            <Text>ID</Text>
            <Input
                defaultValue={id}
                name="id"
                readOnly
            ></Input>

            <Text>Изменен</Text>
            <Input
                defaultValue={modifiedAt.toLocaleString("ru-ru")}
                name="modifiedAt"
                readOnly
            ></Input>
        </HStack>
    );
}
