import { gql } from "@apollo/client";

export const CreateElectionMutation = gql`
  mutation CreateElection($name: String!, $description: String!) {
    createElection(name: $name, description: $description) {
      slug
    }
  }
`;
