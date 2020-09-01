export default {
  client: {
    includes: [
      "./client/src/**",
    ],
    service: {
      name: "psephos",
      localSchemaFile: "./schema.gql",
    },
  },
};
