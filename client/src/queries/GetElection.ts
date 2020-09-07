import { gql } from "@apollo/client";

export const GetElectionQuery = gql`
  query GetElection ($slug: String!) {
    election(slug: $slug) {
      id
      name
      seats
      startTime
      finishTime
      description
      candidates {
        id
        name
        description
        elected
      }
      creator {
        id
        name
      }
    }
  }
`;
