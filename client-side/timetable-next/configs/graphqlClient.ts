import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.GRAPHQL_URL!, {
    errorPolicy: "all",
    next: { revalidate: 60 },
});

export default client;
