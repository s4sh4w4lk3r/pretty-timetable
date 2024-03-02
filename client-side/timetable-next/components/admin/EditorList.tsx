"use client";
import { Button, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import RoomCard from "./room/RoomCard";
import { z } from "zod";
import { roomsSchema } from "@/fetching/admin/zodSchemas";
import { ChevronDownIcon } from "@chakra-ui/icons";

type RoomType = z.infer<typeof roomsSchema.shape.data.shape.rooms.element>;
type RoomKeys = keyof RoomType;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: RoomKeys;
};

export default function EditorList({ rooms }: { rooms: RoomType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);

    const localRooms = rooms
        .filter(r => `${r.address} + ${r.ascId} + ${r.fullName} + ${r.id} + ${r.number} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
        .sort((a, b) => (a[sorting.sortingField]! > b[sorting.sortingField]! ? 1 : -1));

    const roomsElement = localRooms.map(r => (
        <RoomCard
            {...r}
            key={r.id}
        ></RoomCard>
    ));

    return (
        <>
            <Input
                onChange={e => setSorting(draft => void (draft.searchQuery = e.target.value))}
                mt={3}
                w={["300px", null, "600px", null, null]}
                placeholder="Поиск по всем полям"
                ref={inputRef}
            ></Input>

            <Button onClick={() => setSorting(draft => void (draft.isAsc = !draft.isAsc))}>{sorting.isAsc ? "А-Я" : "Я-А"}</Button>
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    {sorting.sortingField}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "id"))}>Id</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "ascId"))}> AscID</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "fullName"))}>Полн. имя</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "number"))}>Номер кабинета</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "address"))}>Корпус</MenuItem>
                </MenuList>
            </Menu>

            {JSON.stringify(sorting)}
            {roomsElement}
        </>
    );
}
