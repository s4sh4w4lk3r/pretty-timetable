import RoomEditor from "@/components/admin/room/RoomEditor";
import { getAllRooms } from "@/fetching/requests";

export default async function RoomsAdmin() {
    const rooms = await getAllRooms();
    return <RoomEditor rooms={rooms}></RoomEditor>;
}
