import { gql } from "./__generated__";

export const ALL_GROUPS = gql(`
query Groups {
    groups {
        id
        name
    }
}
`);

export const ALL_LESSONTIMES = gql(`
query LessonTimes {
    lessonTimes {
        id
        number
        startsAt
        endsAt
    }
}
`);
