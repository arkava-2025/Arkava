
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.HYGRAPH_ENDPOINT || 'http://localhost:4000/graphql', // Fallback for when HYGRAPH_ENDPOINT is not set
  documents: "src/lib/hygraph/queries/*.ts",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true
      }
    }
  }
};

export default config;
