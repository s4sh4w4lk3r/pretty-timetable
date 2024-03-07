"use client";
import { Input } from "@chakra-ui/react";
import { ChangeEvent, useRef, useEffect } from "react";

export default function SearchBar({ onChange }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);

    return (
        <Input
            onChange={onChange}
            mt={3}
            w={"lg"}
            placeholder="Поиск по всем полям"
            ref={inputRef}
        ></Input>
    );
}
