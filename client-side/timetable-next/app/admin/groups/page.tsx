import EditorList from "@/components/admin/EditorList";
import { getRooms } from "@/fetching/admin/requests";
import React from "react";

export default async function AdminGroups() {
    const rooms = await getRooms();
    return <EditorList rooms={rooms}></EditorList>;
}
