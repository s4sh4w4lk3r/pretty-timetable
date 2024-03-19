import GroupEditor from "@/components/admin/group/GroupEditor";
import { getAllCachedGroups } from "@/fetching/cachedData";
import { VStack } from "@chakra-ui/react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const groups = await getAllCachedGroups();
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
