"use client";
import { useEffect, useRef, useState } from "react";
import { Group as GroupType } from "@/types/graphql";
import GroupComponent from "./Group";
import { Center, Input, SimpleGrid, VStack } from "@chakra-ui/react";

export default function GroupList(props: { groups: GroupType[] }) {
    const { groups } = props;
    const [query, setQuery] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);

    let groupFiltered: GroupType[] = groups.filter(g => (query ? g.name.toUpperCase().startsWith(query.toUpperCase()) : g));

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
                    maxW={"400px"}
                    placeholder="Поиск по группам"
                    ref={inputRef}
                ></Input>
                <Center>
                    <SimpleGrid
                        columns={[1, 2, null, null, 3]}
                        spacing={3}
                        m={5}
                        maxW={"1200px"}
                    >
                        {groupsElement}
                    </SimpleGrid>
                </Center>
            </VStack>
        </>
    );
}
