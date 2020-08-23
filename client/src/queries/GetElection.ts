import { gql } from "@apollo/client";

export const GetElectionQuery = gql`
  query GetElection ($slug: String!) {
    election(slug: $slug) {
      id
      name
      description
      creator {
        name
      }
    }
  }
`;
