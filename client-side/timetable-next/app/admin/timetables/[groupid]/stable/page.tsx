import { notFound } from "next/navigation";
import React from "react";

export default function AdminStableTimetables({ params }: { params: { groupid: string } }) {
    const { groupid } = params;
    const groupIdInt = Number.parseInt(groupid);

    if (!Number.isSafeInteger(groupIdInt)) {
        notFound();
    }
    return <div>{JSON.stringify({ groupIdInt })}</div>;
}
