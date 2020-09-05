import { gql } from "@apollo/client";

export const CreateElectionMutation = gql`
  mutation CreateElection(
    $name: String!,
    $seats: Int!,
    $startTime: DateTime!,
    $finishTime: DateTime,
    $description: String!
  ) {
    createElection(
      name: $name,
      seats: $seats,
      startTime: $startTime,
      finishTime: $finishTime,
      description: $description
    ) {
      id
      name
      description
      slug
    }
  }
`;
