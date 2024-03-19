import RoomEditor from "@/components/admin/room/RoomEditor";
import { getAllCachedRooms } from "@/fetching/cachedData";

export default async function RoomsAdmin() {
    const rooms = await getAllCachedRooms();
    return <RoomEditor rooms={rooms}></RoomEditor>;
}
