import { gql } from "@apollo/client";

export const MeQuery = gql`
  query Me {
    me {
      id
      name
      email
      votedElections {
        id
      }
    }
  }
`;
