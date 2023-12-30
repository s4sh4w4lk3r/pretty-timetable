import { ApolloClient, InMemoryCache } from '@apollo/client';
import env from "../../../envConfig"

export default new ApolloClient({
    uri: `${env.apiAddress}/graphql`,
    cache: new InMemoryCache(),
});