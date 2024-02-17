"use client";
import { useEffect, useRef, useState } from "react";
import GroupComponent from "./Group";
import { Center, Input, SimpleGrid, VStack } from "@chakra-ui/react";

export default function GroupList({ groups }: { groups: { id: number; name: string }[] }) {
    const [query, setQuery] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);

    let groupFiltered = groups.filter(g => (query ? g.name.toUpperCase().startsWith(query.toUpperCase()) : g));

    const groupsElement = groupFiltered.map(g => (
        <GroupComponent
            key={g.id}
            id={g.id}
            name={g.name}
        ></GroupComponent>
    ));

    return (
        <>
            <VStack>
                <Input
                    onChange={e => setQuery(e.target.value)}
                    mt={3}
                    w={["300px", null, "600px", null, null]}
                    placeholder="Поиск по группам"
                    ref={inputRef}
                ></Input>
                <Center>
                    <SimpleGrid
                        columns={[1, 1, 2, null, 3]}
                        spacing={3}
                        m={5}
                        w={["300px", null, "600px", null, "1200px"]}
                    >
                        {groupsElement}
                    </SimpleGrid>
                </Center>
            </VStack>
        </>
    );
}
