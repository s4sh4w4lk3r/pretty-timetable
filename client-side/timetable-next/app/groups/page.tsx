import Group from "@/components/group/Group";
import { getGroups } from "@/fetching/rest/data";
import { VStack } from "@chakra-ui/react";

export default async function Groups() {
    const groups = await getGroups();
    const groupsElement = groups.map(g => (
        <Group
            key={g.id}
            id={g.id}
            name={g.name}
        ></Group>
    ));

    return (
        <VStack
            alignItems={"stretch"}
            m={"15px"}
            gap={"15px"}
        >
            {groupsElement}
        </VStack>
    );
}
