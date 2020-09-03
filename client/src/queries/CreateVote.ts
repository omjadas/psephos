import { gql } from "@apollo/client";

export const CreateVoteMutation = gql`
  mutation CreateVote($electionId: ID!, $preferences: [PreferenceInput!]!) {
    createVote(electionId: $electionId, preferences: $preferences)
  }
`;
