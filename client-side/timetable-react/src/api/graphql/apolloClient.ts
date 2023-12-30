import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
    uri: 'http://localhost:5012/graphql',
    cache: new InMemoryCache(),
});