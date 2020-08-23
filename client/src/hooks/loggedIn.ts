import { useQuery } from "@apollo/client";
import { LOGGED_IN_QUERY } from "../queries/LOGGED_IN";
import { LOGGED_IN } from "../queries/types/LOGGED_IN";

export function useLoginStatus(): boolean | null {
  const { loading, data, error } = useQuery<LOGGED_IN>(LOGGED_IN_QUERY);

  if (loading) {
    return null;
  }

  if (error) {
    return false;
  }

  return data?.me.id !== undefined;
}
