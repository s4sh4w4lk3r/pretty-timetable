import { RevalidationTags } from "@/server-actions/revalidation";
import { AdminZodFetchSchemas, PublicZodFetchShemas } from "./zodFetchSchemas";

export namespace AdminFetches {
    export async function getRooms() {
        const query = "GetRooms";

        const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, {
            method: "GET",
            cache: "no-store",
        });

        const rooms = AdminZodFetchSchemas.roomsSchema.parse(await res.json());
        return rooms.data.rooms;
    }
}

export namespace PublicFetches {
    export async function getTimetable({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
        const query = "GetActualTimetableByGroupId";

        const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}&variables={"groupId":${groupId},"weekNumber":${weekNumber}}`, {
            method: "GET",
            next: { tags: [RevalidationTags.LessonTime, RevalidationTags.Room, RevalidationTags.Subject, RevalidationTags.Teacher] },
        });

        const timetables = await PublicZodFetchShemas.actualTimetablesSchema.parseAsync(await res.json());
        return timetables.data.actualTimetables[0];
    }

    export async function getLessonTimes() {
        const query = "GetAllLessonTimes";
        const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, {
            method: "GET",
            next: { tags: [RevalidationTags.LessonTime] },
        });

        const lessonTimes = PublicZodFetchShemas.lessonTimesSchema.parse(await res.json());
        return lessonTimes.data.lessonTimes;
    }

    export async function getGroups() {
        const query = "GetAllGroups";
        const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, { method: "GET", next: { tags: [RevalidationTags.Group] } });

        const groups = await PublicZodFetchShemas.groupsSchema.parseAsync(await res.json());

        return groups.data.groups;
    }
}
