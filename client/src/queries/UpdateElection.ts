import { gql } from "@apollo/client";

export const UpdateElectionMutation = gql`
  mutation UpdateElection ($id: ID!, $name: String!, $description: String!) {
    updateElection(id: $id, name: $name, description: $description) {
      name
      description
    }
  }
`;
