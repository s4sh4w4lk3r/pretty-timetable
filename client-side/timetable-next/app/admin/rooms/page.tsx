import RoomCard from "@/components/admin/room/RoomCard";
import { getRooms } from "@/fetching/admin/requests";
import { Center, VStack } from "@chakra-ui/react";
import React from "react";

export default async function RoomsAdmin() {
    const rooms = await getRooms();
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
