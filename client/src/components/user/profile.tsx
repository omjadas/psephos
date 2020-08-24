import { useQuery } from "@apollo/client";
import React from "react";
import { MeQuery } from "../../queries/Me";
import { Me } from "../../queries/types/Me";

export const Profile = (): JSX.Element => {
  const { loading, error, data } = useQuery<Me>(
    MeQuery,
    { errorPolicy: "all" }
  );

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
