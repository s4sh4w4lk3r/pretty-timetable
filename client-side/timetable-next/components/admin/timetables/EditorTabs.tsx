"use client";
import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

export default function EditorTabs({ groupId, children }: { groupId: number | string; children: ReactNode }) {
    const fourthSegment = usePathname().split("/")[4];
    const [tabIndex, setTabIndex] = useState<number>(fourthSegment === "stable" ? 1 : 0);
    const router = useRouter();

    return (
        <Tabs
            isFitted
            variant="enclosed"
            colorScheme="purple"
            w={"calc(100% - 3.125rem)"}
            borderWidth={"1px"}
            borderRadius={"xl"}
            tabIndex={tabIndex}
        >
            <TabList mb="1em">
                <Tab
                    onClick={() => {
                        setTabIndex(0);
                        router.push(`/admin/timetables/${groupId}/actual`);
                    }}
                    tabIndex={0}
                >
                    Недельное
                </Tab>
                <Tab
                    tabIndex={1}
                    onClick={() => {
                        setTabIndex(1);
                        router.push(`/admin/timetables/${groupId}/stable`);
                    }}
                >
                    Семестровое
                </Tab>
            </TabList>

            <TabPanels>{children}</TabPanels>
        </Tabs>
    );
}
