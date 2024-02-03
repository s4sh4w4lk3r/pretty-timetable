import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.GRAPHQL_URL!,
});

export default apolloClient;
