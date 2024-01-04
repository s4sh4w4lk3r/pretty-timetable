import { gql } from "./__generated__/gql"

export const ALL_GROUPS = gql(`
query Groups {
    groups {
        id
        name
    }
}
`);

export const ACTUAL_TIMETABLE_BY_GROUP_ID = gql( `
query ActualTimetables($groupId: Int!) {
    actualTimetables(where: { groupId: { eq: $groupId } }) {
        group {
            id
            name
        }
        weekNumber
        cards {
            cabinet {
                id
                fullName
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
            lessonTimeId
            date
            isModified
            isCanceled
            isMoved
            subGroup
        }
    }
}
`)