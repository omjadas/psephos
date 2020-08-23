import { useQuery } from "@apollo/client";
import { LoggedInQuery } from "../queries/LoggedIn";
import { LoggedIn } from "../queries/types/LoggedIn";

export function useLoginStatus(): boolean | null {
  const { loading, data, error } = useQuery<LoggedIn>(LoggedInQuery);

  if (loading) {
    return null;
  }

  if (error) {
    return false;
  }

  return data?.me.id !== undefined;
}
