import alertNoData from "@/components/miscellaneous/alertNoData";
import Group from "@/components/group/Group";
import { getGroups } from "@/fetching/graphql/requests";
import { Center, SimpleGrid } from "@chakra-ui/react";

export default async function Groups() {
    const groups = await getGroups();
    if (!groups) {
        return alertNoData;
    }

    const groupsElement = groups.map(g => (
        <Group
            key={g.id}
            id={g.id}
            name={g.name}
        ></Group>
    ));

    return (
        <Center>
            <SimpleGrid
                columns={[1, 2, null, null, 3]}
                spacing={3}
                m={"20px"}
                maxW={"1200px"}
            >
                {groupsElement}
            </SimpleGrid>
        </Center>
    );
}
// TODO : изменть запрос графкл, сделать три списка с группами из трех корпусов
