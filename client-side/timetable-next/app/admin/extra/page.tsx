import FileUploadButton from "@/components/admin/extra/FileUploadButton";
import MigrationButton from "@/components/admin/extra/MigrationButton";
import TimetablesProjection from "@/components/admin/extra/TimetablesProjection";
import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function ExtraPage() {
    return (
        <VStack
            w={"full"}
            mx={4}
            mt={20}
        >
            <HStack w={"full"}>
                <Text>Импорт из ASC</Text>
                <FileUploadButton />
            </HStack>

            <HStack w={"full"}>
                <Text>Миграция базы данных</Text>
                <MigrationButton />
            </HStack>

            <TimetablesProjection />
        </VStack>
    );
}
