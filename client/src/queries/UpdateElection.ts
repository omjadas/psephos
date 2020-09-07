import { gql } from "@apollo/client";

export const UpdateElectionMutation = gql`
  mutation UpdateElection (
    $id: ID!,
    $name: String,
    $description: String,
    $startTime: DateTime,
    $finishTime: DateTime
  ) {
    updateElection(
      id: $id,
      name: $name,
      description: $description,
      startTime: $startTime,
      finishTime: $finishTime
    ) {
      id
      name
      description
      startTime
      finishTime
    }
  }
`;
