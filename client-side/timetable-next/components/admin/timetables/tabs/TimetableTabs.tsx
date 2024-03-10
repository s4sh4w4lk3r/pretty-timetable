"use client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import ActualTimetableTab from "./ActualTimetableTab";
import StableTimetableTab from "./StableTimetableTab";
import GroupEditor from "../../group/GroupEditor";
import { groupsSchema } from "@/fetching/public/zodSchemas";
import { z } from "zod";

type GroupType = z.infer<typeof groupsSchema.shape.data.shape.groups.element>;
export default function TimetableTabs({ groups }: { groups: GroupType[] }) {
    const [groupId, setGroupId] = useState(0);

    return (
        <>
            <GroupEditor
                onGroupSelected={setGroupId}
                groups={groups}
            />
            <Tabs
                isFitted
                variant="enclosed-colored"
                colorScheme="purple"
            >
                <TabList mb="1em">
                    <Tab>Еженедельное</Tab>
                    <Tab>Семестровое</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ActualTimetableTab />
                    </TabPanel>

                    <TabPanel>
                        <StableTimetableTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
