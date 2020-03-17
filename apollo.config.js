module.exports = {
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
