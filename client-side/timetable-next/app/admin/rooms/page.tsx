import RoomEditor from "@/components/admin/room/RoomEditor";
import { getRooms } from "@/fetching/admin/requests";

export default async function RoomsAdmin() {
    const rooms = await getRooms();
    return <RoomEditor rooms={rooms}></RoomEditor>;
}
