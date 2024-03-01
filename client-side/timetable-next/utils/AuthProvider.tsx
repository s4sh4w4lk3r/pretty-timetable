"use client";
import SessionGuard from "@/components/admin/SessionGuard";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={4 * 60}>
            <SessionGuard>{children}</SessionGuard>
        </SessionProvider>
    );
}
