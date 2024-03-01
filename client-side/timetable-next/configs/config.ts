import { z } from "zod";

const vars = process.env;

const configSchema = z.object({
    api: z.object({
        restBaseUrl: z.string().url(),
        graphQLBaseUrl: z.string().url(),
    }),

    auth: z.object({
        keycloak: z.object({
            clientId: z.string(),
            secret: z.string(),
            issuer: z.string().url(),
        }),
        next: z.object({
            secret: z.string(),
            baseUrl: z.string().url(),
        }),
    }),
});

const config: z.infer<typeof configSchema> = {
    api: {
        restBaseUrl: vars.REST_URL!,
        graphQLBaseUrl: vars.GRAPHQL_URL!,
    },
    auth: {
        keycloak: {
            clientId: vars.KEYCLOAK_CLIENT_ID!,
            secret: vars.KEYCLOAK_CLIENT_SECRET!,
            issuer: vars.KEYCLOAK_ISSUER!,
        },

        next: {
            secret: vars.NEXTAUTH_SECRET!,
            baseUrl: vars.NEXTAUTH_URL!,
        },
    },
};

export default configSchema.parse(config);
