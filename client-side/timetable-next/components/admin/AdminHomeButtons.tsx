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
                    colorScheme="purple"
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
                <Link href="/admin/timetables">
                    <Button
                        w={64}
                        colorScheme="purple"
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
            colorScheme="purple"
        >
            Вернуться на главную
        </Button>
    </Link>
);
