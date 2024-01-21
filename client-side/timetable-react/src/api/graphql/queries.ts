import { gql } from "./__generated__/gql";

export const ALL_GROUPS = gql(`
query Groups {
    groups {
        id
        name
    }
}
`);

export const ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER = gql(`
query ActualTimetables($groupId: Int!, $weekNumber: Int!) {
    actualTimetables(
        where: { groupId: { eq: $groupId }, weekNumber: { eq: $weekNumber } }
    ) {
        group {
            id
            name
        }
        weekNumber
        cards {
            cabinet {
                id
                number
                address
            }
            teacher {
                id
                firstname
                lastname
            }
            subject {
                name
                id
            }
            date
            isModified
            isCanceled
            isMoved
            subGroup
            id
            lessonTime {
                endsAt
                startsAt
                id
                number
            }
        }
    }
}
`);
