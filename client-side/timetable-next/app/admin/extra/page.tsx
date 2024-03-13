import FileUploadButton from "@/components/admin/extra/FileUploadButton";
import MigrationButton from "@/components/admin/extra/MigrationButton";
import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function ExtraPage() {
    return (
        <VStack w={"full"}>
            <HStack w={"full"}>
                <Text>Импорт из ASC</Text>
                <FileUploadButton />
            </HStack>
            <MigrationButton />
        </VStack>
    );
}
