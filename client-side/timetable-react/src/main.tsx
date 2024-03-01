import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import env from "../env";
import { AuthProvider } from "react-oidc-context";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: env.api.graphqlUrl,
});

const oidcConfig = {
    authority: env.auth.address,
    client_id: env.auth.clientId,
    redirect_uri: "http://localhost:5157",
};

// TODO : сделать по нормальному env.ts  и посомтреть че как с куками для аутх
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <ApolloProvider client={apolloClient}>
                <App />
            </ApolloProvider>
        </AuthProvider>
    </React.StrictMode>
);
