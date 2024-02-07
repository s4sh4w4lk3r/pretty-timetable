import { gql } from "graphql-request";

export const getTimetableByIdQuery = gql`
    query ActualTimetables($groupId: Int!, $weekNumber: Int!) {
        actualTimetables(where: { groupId: { eq: $groupId }, weekNumber: { eq: $weekNumber } }) {
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
`;

export const getGroupsQuery = gql`
    query Groups {
        groups {
            id
            name
        }
    }
`;

export const getLessonTimesQuery = gql`
    query LessonTimes {
        lessonTimes {
            id
            number
            startsAt
            endsAt
        }
    }
`;
