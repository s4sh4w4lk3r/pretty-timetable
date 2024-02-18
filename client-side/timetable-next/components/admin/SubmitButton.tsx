"use client";
import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children?: ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            bgColor={pending ? "purple.600" : "purple.500"}
            _hover={{ backgroundColor: "purple.600" }}
        >
            {pending ? "Отправка..." : children}
        </Button>
    );
}

// TODO: пока не проверял работу
