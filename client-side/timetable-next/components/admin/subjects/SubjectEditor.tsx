"use client";
import { Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { Tr, Th, Td } from "@chakra-ui/react";
import { useState } from "react";
import { useImmer } from "use-immer";
import { z } from "zod";
import { getSubjectsSchema } from "@/fetching/admin/zodSchemas";
import genericSort from "@/utils/genericSort";
import EditorTable from "../EditorTable";
import SearchBar from "../SearchBar";
import SubjectModal from "./SubjectModal";

type SubjectType = z.infer<typeof getSubjectsSchema.shape.data.shape.subjects.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof SubjectType;
};
const hover = { cursor: "pointer", color: "purple.300" };

export default function SubjectEditor({ subjects }: { subjects: SubjectType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });
    const initialSubject: SubjectType = { id: 0, name: "", ascId: "", modifiedAt: new Date() };
    const [selectedSubject, setSelectedSubject] = useState<SubjectType>(initialSubject);
    const disclosure = useDisclosure();

    const localSubjects = subjects
        .filter(s => ` ${s.ascId}  + ${s.id} + ${s.name} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
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
                        draft.sortingField = "name";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                Название
            </Th>

            <Th
                _hover={hover}
                // onClick={() =>
                //     setSorting(draft => {
                //         draft.sortingField = "name";
                //         draft.isAsc = !draft.isAsc;
                //     })
                // }
            >
                Последнее изменение
            </Th>
        </>
    );

    const tableBody = localSubjects.map(s => (
        <Tr
            key={s.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
            onClick={() => {
                setSelectedSubject(s);
                disclosure.onOpen();
            }}
        >
            <Td>{s.id}</Td>
            <Td>{s.name}</Td>
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
                            setSelectedSubject(initialSubject);
                            disclosure.onOpen();
                        }}
                    >
                        Добавить
                    </Button>
                </HStack>

                <EditorTable tableHeaders={tableHeaders}> {tableBody}</EditorTable>
            </VStack>

            <SubjectModal
                disclosure={disclosure}
                key={selectedSubject.id}
                selectedSubject={selectedSubject}
            ></SubjectModal>
        </>
    );
}
