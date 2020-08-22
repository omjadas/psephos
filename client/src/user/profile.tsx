import { gql, useQuery } from "@apollo/client";
import React from "react";

const ME = gql`
  query ME {
    me {
      id
      name
      email
    }
  }
`;

export const Profile = (_props: any): JSX.Element => {
  const { loading, error, data } = useQuery(ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      User ID: {data.me.id}
    </div>
  );
};
