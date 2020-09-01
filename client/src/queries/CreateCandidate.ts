import { gql } from "@apollo/client";

export const CreateCandidateMutation = gql`
  mutation CreateCandidate($name: String!, $description: String!, $election: ID!) {
    createCandidate(name: $name, description: $description, election: $election) {
      id
      name
      description
    }
  }
`;
