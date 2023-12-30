import { gql } from "@apollo/client";

export const ALL_GROUPS = gql`
query Groups {
    groups {
        id
        name
    }
}
`;