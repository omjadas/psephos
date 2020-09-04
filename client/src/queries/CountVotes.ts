import { gql } from "@apollo/client";

export const CountVotesMutation = gql`
  mutation CountVotes($id: ID!) {
    countVotes(id: $id) {
      id
    }
  }
`;
