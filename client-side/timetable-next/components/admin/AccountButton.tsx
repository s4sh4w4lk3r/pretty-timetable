"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { federatedLogout } from "@/utils/client/auth";

export default function AccountButton() {
    const { status } = useSession();

    return status === "authenticated" ? <LogoutButton /> : <LoginButton />;
}

function LoginButton() {
    return (
        <Button
            onClick={() => {
                signIn("keycloak");
            }}
            colorScheme="blue"
        >
            Войти
        </Button>
    );
}

function LogoutButton() {
    return (
        <Button
            onClick={() => {
                federatedLogout();
            }}
            colorScheme="red"
        >
            Выйти
        </Button>
    );
}
