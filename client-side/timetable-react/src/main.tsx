import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import envConfig from "../env";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: envConfig.api.graphqlUrl,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
