import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function AdminTimetalbes({ params }: { params: { groupid: string } }) {
    return (
        <Tabs
            isFitted
            variant="enclosed"
            colorScheme="purple"
            w={"calc(100% - 3.125rem)"}
            borderWidth={"1px"}
            borderRadius={"xl"}
        >
            <TabList mb="1em">
                <Tab>
                    <Link href={`/admin/timetables/${params.groupid}/actual`}>Недельное</Link>
                </Tab>
                <Tab>
                    <Link href={`/admin/timetables/${params.groupid}/stable`}>Семестровое</Link>
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>1</TabPanel>

                <TabPanel>2</TabPanel>
            </TabPanels>
        </Tabs>
    );
}
