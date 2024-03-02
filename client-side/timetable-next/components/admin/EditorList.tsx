"use client";
import { Button, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import RoomCard from "./room/RoomCard";
import { z } from "zod";
import { roomsSchema } from "@/fetching/admin/zodSchemas";
import { ChevronDownIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import genericSort from "@/utils/genericSort";

type RoomType = z.infer<typeof roomsSchema.shape.data.shape.rooms.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof RoomType;
};

export default function EditorList({ rooms }: { rooms: RoomType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);

    const localRooms = rooms
        .filter(r => `${r.address} + ${r.ascId} + ${r.fullName} + ${r.id} + ${r.number} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
        .sort((a, b) => genericSort<RoomType>(sorting.sortingField, sorting.isAsc, a, b));

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

            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    Сортировка
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "id"))}>ID</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "fullName"))}>Полн. имя</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "number"))}>Номер кабинета</MenuItem>
                    <MenuItem onClick={() => setSorting(draft => void (draft.sortingField = "address"))}>Корпус</MenuItem>
                </MenuList>
            </Menu>

            <Button onClick={() => setSorting(draft => void (draft.isAsc = !draft.isAsc))}>
                {sorting.isAsc ? <ArrowUpIcon boxSize={5} /> : <ArrowDownIcon boxSize={5} />}
            </Button>

            {JSON.stringify(sorting)}
            {roomsElement}
        </>
    );
}
