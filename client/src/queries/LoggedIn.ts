import { gql } from "@apollo/client";

export const LoggedInQuery = gql`
  query LoggedIn {
    me {
      id
    }
  }
`;
