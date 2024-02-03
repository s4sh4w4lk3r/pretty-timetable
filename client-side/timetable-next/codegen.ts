import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = <CodegenConfig>{
    schema: "http://localhost:5012/graphql",
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "./fetching/graphql/__generated__/": {
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
