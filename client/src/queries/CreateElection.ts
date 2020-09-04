import { gql } from "@apollo/client";

export const CreateElectionMutation = gql`
  mutation CreateElection($name: String!, $seats: Int!, $description: String!) {
    createElection(name: $name, seats: $seats ,description: $description) {
      id
      name
      description
      slug
    }
  }
`;
