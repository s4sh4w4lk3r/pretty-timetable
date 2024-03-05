"use client";
import { Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children?: ReactNode }) {
    // В этом компоненте нет смысла, поскольку useFormStatus не работает при e.preventDefault();
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            colorScheme="purple"
            _hover={{ backgroundColor: "purple.600" }}
        >
            {pending ? <Spinner /> : children}
        </Button>
    );
}
