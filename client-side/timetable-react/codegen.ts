import { CodegenConfig } from '@graphql-codegen/cli';
import env from './envConfig'

const config: CodegenConfig = {
  schema: `${env.apiAddress}/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/api/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;