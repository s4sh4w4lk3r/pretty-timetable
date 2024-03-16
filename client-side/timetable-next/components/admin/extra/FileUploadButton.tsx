"use client";
import { importAsc } from "@/server-actions/extraActions";
import useToasts from "@/utils/client/useToasts";
import { Button } from "@chakra-ui/react";
import React, { useRef } from "react";

export default function FileUploadButton() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { failedToast, loadingToast, successfulToast, toast } = useToasts();
    return (
        <>
            <input
                type="file"
                id="timetable"
                name="timetable"
                ref={inputRef}
                hidden
                onChange={async e => {
                    const file = e.target.files?.item(0);
                    if (!file) return;

                    const toastId = loadingToast("Отправка файла...");
                    const res = await importAsc(file);
                    toast.close(toastId);
                    res.success ? successfulToast(res.message) : failedToast(res.message);
                }}
            />

            <Button
                onClick={() => {
                    inputRef.current?.click();
                }}
                colorScheme="yellow"
            >
                Выбрать файл
            </Button>
        </>
    );
}
