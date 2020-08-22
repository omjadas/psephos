import { gql, useQuery } from "@apollo/client";

const SIGNED_IN = gql`
  query SIGNED_IN {
    me {
      id
    }
  }
`;

export function useLoginStatus(): boolean | null {
  const { loading, data, error } = useQuery(SIGNED_IN);

  if (loading) {
    return null;
  }

  if (error) {
    return false;
  }

  return data?.me?.id !== undefined;
}
