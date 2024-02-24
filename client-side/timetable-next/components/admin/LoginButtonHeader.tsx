"use client";
import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function LoginButton() {
    const { status } = useSession();

    if (status === "authenticated") {
        return (
            <Button
                onClick={() => {
                    signOut({ callbackUrl: "/admin" });
                }}
            >
                Выйти
            </Button>
        );
    } else {
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
}
