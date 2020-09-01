import { gql } from "@apollo/client";

export const DeleteElectionMutation = gql`
  mutation DeleteElection ($id: ID!) {
    deleteElection(id: $id)
  }
`;
