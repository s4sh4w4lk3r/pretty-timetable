import FileUploadButton from "@/components/admin/extra/FileUploadButton";
import MigrationButton from "@/components/admin/extra/MigrationButton";
import TimetablesProjection from "@/components/admin/extra/TimetablesProjection";
import { Center, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function ExtraPage() {
    return (
        <Center>
            <VStack
                mx={4}
                mt={20}
                divider={<StackDivider />}
                w={"900px"}
                justifyContent={"center"}
                borderWidth={"1px"}
                borderRadius={"md"}
                padding={4}
                gap={4}
            >
                <HStack>
                    <Text>Импорт из ASC</Text>
                    <FileUploadButton />
                </HStack>

                <HStack>
                    <Text>Миграция базы данных</Text>
                    <MigrationButton />
                </HStack>

                <HStack>
                    <Text>Создать расписание на выбранную неделю</Text>
                    <TimetablesProjection />
                </HStack>
            </VStack>
        </Center>
    );
}
