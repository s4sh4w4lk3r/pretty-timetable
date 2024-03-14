"use client";
import { migrate } from "@/server-actions/extraActions";
import useToasts from "@/utils/client/useToasts";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function MigrationButton() {
    const { failedToast, loadingToast, successfulToast, toast } = useToasts();
    return (
        <Button
            onClick={async () => {
                const toastId = loadingToast("Проведение миграции...");
                const res = await migrate();
                toast.close(toastId);
                res.success ? successfulToast(res.message) : failedToast(res.message);
            }}
            colorScheme="red"
        >
            Провести миграцию
        </Button>
    );
}
