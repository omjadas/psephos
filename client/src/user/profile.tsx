import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { QueryRenderer } from "react-relay";
import { environment } from "../relay";

export const Profile = (_props: any): JSX.Element => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query profileQuery {
          me {
            id
            name
            email
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        console.log(error);
        console.log(props);
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (<div>User ID: {(props as any).me.id}</div>);
      }}
    />
  );
};
