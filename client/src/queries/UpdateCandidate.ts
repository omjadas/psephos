import { gql } from "@apollo/client";

export const UpdateCandidateMutation = gql`
  mutation UpdateCandidate ($id: ID!, $name: String, $description: String) {
    updateCandidate(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
