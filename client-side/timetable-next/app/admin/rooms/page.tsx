import RoomCard from "@/components/admin/room/RoomCard";
import { Center, VStack } from "@chakra-ui/react";
import React from "react";
import { AdminFetches } from "@/fetching/fetchRequests";

export default async function RoomsAdmin() {
    const rooms = await AdminFetches.getRooms();
    return (
        <Center>
            <VStack
                gap={3}
                w={"5xl"}
            >
                {rooms?.map(r => (
                    <RoomCard
                        key={r.id}
                        {...r}
                    ></RoomCard>
                ))}
            </VStack>
        </Center>
    );
}
