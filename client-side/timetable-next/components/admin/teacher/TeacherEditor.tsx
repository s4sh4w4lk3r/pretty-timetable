"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Button, HStack, Td, Th, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import { useImmer } from "use-immer";
import genericSort from "@/utils/genericSort";
import EditorTable from "../EditorTable";
import SearchBar from "../SearchBar";
import TeacherModal from "./TeacherModal";
import { getHighLevelDataSchema } from "@/fetching/zodSchemas";

type TeacherType = z.infer<typeof getHighLevelDataSchema.shape.data.shape.teachers.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof TeacherType;
};
const hover = { cursor: "pointer", color: "purple.300" };
export default function TeacherEditor({ teachers }: { teachers: TeacherType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });
    const initialTeacher: TeacherType = { id: 0, firstname: "", lastname: "", middlename: "", ascId: "", modifiedAt: new Date() };
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherType>(initialTeacher);
    const disclosure = useDisclosure();

    const localTeachers = teachers
        .filter(t =>
            ` ${t.ascId}  + ${t.id} + ${t.lastname} + ${t.firstname} + ${t.middlename}`.toUpperCase().includes(sorting.searchQuery.toUpperCase())
        )
        .sort((a, b) => genericSort(sorting.sortingField, sorting.isAsc, a, b));

    const tableHeaders = (
        <>
            <Th
                _hover={hover}
                onClick={() =>
                    setSorting(draft => {
                        draft.sortingField = "id";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                Id
            </Th>

            <Th
                _hover={hover}
                onClick={() =>
                    setSorting(draft => {
                        draft.sortingField = "lastname";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                ФИО
            </Th>

            <Th _hover={hover}>Последнее изменение</Th>
        </>
    );

    const tableBody = localTeachers.map(s => (
        <Tr
            key={s.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
            onClick={() => {
                setSelectedTeacher(s);
                disclosure.onOpen();
            }}
        >
            <Td>{s.id}</Td>
            <Td>{`${s.lastname} ${s.firstname} ${s.middlename}`}</Td>
            <Td>{s.modifiedAt.toLocaleString("ru-ru")}</Td>
        </Tr>
    ));

    return (
        <>
            <VStack
                borderWidth={"1px"}
                borderRadius={"md"}
                maxW={"8xl"}
                mx={"auto"}
                mt={20}
            >
                <HStack mt={3}>
                    <SearchBar onChange={e => setSorting(draft => void (draft.searchQuery = e.target.value))} />
                    <Button
                        colorScheme="green"
                        onClick={() => {
                            setSelectedTeacher(initialTeacher);
                            disclosure.onOpen();
                        }}
                    >
                        Добавить
                    </Button>
                </HStack>

                <EditorTable tableHeaders={tableHeaders}> {tableBody}</EditorTable>
            </VStack>

            <TeacherModal
                disclosure={disclosure}
                key={selectedTeacher.id}
                selectedTeacher={selectedTeacher}
            ></TeacherModal>
        </>
    );
}
