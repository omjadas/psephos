import { useQuery } from "@apollo/client";
import React from "react";
import { MeQuery } from "../../queries/Me";
import { Me } from "../../queries/types/Me";

export const Profile = (_props: any): JSX.Element => {
  const { loading, error, data } = useQuery<Me>(MeQuery);

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
