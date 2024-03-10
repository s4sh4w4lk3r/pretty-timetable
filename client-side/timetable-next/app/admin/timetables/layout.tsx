import GroupEditor from "@/components/admin/group/GroupEditor";
import { getGroups } from "@/fetching/public/requests";
import { VStack } from "@chakra-ui/react";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const groups = await getGroups();
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
