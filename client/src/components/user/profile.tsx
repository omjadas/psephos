import { useQuery } from "@apollo/client";
import React from "react";
import { ME_QUERY } from "../../queries/ME";
import { ME } from "../../queries/types/ME";

export const Profile = (_props: any): JSX.Element => {
  const { loading, error, data } = useQuery<ME>(ME_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      User ID: {data?.me.id}
    </div>
  );
};
