import { CodegenConfig } from "@graphql-codegen/cli";
import env from "./env";

const config: CodegenConfig = {
    schema: env.api.graphqlUrl,
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "./src/api/graphql/__generated__/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
