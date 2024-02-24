import LoginButtonHome from "@/components/admin/AdminHomeButtons";
import { Center, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function AdminHome() {
    return (
        <Center>
            <VStack>
                <Text
                    fontSize={"2xl"}
                    mt={24}
                >
                    Добро пожаловать в панель администратора
                </Text>
                <LoginButtonHome />
            </VStack>
        </Center>
    );
}
