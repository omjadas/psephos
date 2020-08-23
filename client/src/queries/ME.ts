import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query ME {
    me {
      id
      name
      email
    }
  }
`;
