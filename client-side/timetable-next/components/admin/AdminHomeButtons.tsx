"use client";
import { Button, HStack } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function LoginButtonHome() {
    const { status } = useSession();

    if (status !== "authenticated")
        return (
            <HStack gap={7}>
                <Button
                    w={64}
                    bgColor={"purple.500"}
                    _hover={{ backgroundColor: "purple.600" }}
                    onClick={() => {
                        signIn("keycloak");
                    }}
                >
                    Войти в аккаунт
                </Button>
                {goToHomeBtn}
            </HStack>
        );
    else
        return (
            <HStack gap={7}>
                <Link href="/admin">
                    <Button
                        w={64}
                        bgColor={"purple.500"}
                        _hover={{ backgroundColor: "purple.600" }}
                    >
                        Изменить расписание
                    </Button>
                </Link>
                {goToHomeBtn}
            </HStack>
        );
}

const goToHomeBtn = (
    <Link href="/">
        <Button
            w={64}
            bgColor={"purple.500"}
            _hover={{ backgroundColor: "purple.600" }}
        >
            Вернуться на главную
        </Button>
    </Link>
);
