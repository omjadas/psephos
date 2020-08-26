import { gql } from "@apollo/client";

export const DeleteCandidateMutation = gql`
  mutation DeleteCandidate ($id: ID!) {
    deleteCandidate(id: $id)
  }
`;
