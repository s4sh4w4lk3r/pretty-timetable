import GroupEditor from "@/components/admin/group/GroupEditor";
import { getAllGroups } from "@/fetching/requests";
import { VStack } from "@chakra-ui/react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const groups = await getAllGroups();
    return (
        <VStack
            mt={20}
            w={"full"}
        >
            <GroupEditor groups={groups} />
            {children}
        </VStack>
    );
}
