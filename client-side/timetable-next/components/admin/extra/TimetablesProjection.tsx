"use client";
import { project } from "@/server-actions/extraActions";
import useToasts from "@/utils/client/useToasts";
import { Button, Input, VStack } from "@chakra-ui/react";
import React from "react";

export default function TimetablesProjection() {
    const { failedToast, loadingToast, successfulToast, toast } = useToasts();
    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                const toastId = loadingToast("Создание расписания...");
                const res = await project(new FormData(e.currentTarget));
                toast.close(toastId);
                res.success ? successfulToast(res.message) : failedToast(res.message);
            }}
        >
            <VStack w={"full"}>
                <Input
                    type="date"
                    name="date"
                />
                <Button
                    type="submit"
                    colorScheme="blue"
                >
                    Создать расписание
                </Button>
            </VStack>
        </form>
    );
}
