import { gql } from "../../__generated__";

export const ALL_GROUPS = gql(`
query Groups {
    groups {
        id
        name
    }
}
`)