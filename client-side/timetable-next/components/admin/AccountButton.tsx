"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { federatedLogout } from "@/utils/auth";

export default function AccountButton() {
    const { status } = useSession();

    return status === "authenticated" ? <LogoutButton /> : <LoginButton />;
}

export function LoginButton() {
    return (
        <Button
            onClick={() => {
                signIn("keycloak");
            }}
        >
            Войти
        </Button>
    );
}

export function LogoutButton() {
    return (
        <Button
            onClick={() => {
                federatedLogout();
            }}
        >
            Выйти
        </Button>
    );
}
