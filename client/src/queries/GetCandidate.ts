import { gql } from "@apollo/client";

export const GetCandidateQuery = gql`
  query GetCandidate ($slug: String!) {
    candidate(slug: $slug) {
      id
      name
      description
      elected
    }
  }
`;
