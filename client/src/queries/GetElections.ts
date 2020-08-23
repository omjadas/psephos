import { gql } from "@apollo/client";

export const GetElectionsQuery = gql`
  query GetElections {
    elections {
      id
      name
      description
    }
  }
`;
