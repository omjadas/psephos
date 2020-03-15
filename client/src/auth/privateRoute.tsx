import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ME = gql`
  query ME {
    me {
      id
    }
  }
`;

export const PrivateRoute = ({ children, ...rest }: RouteProps): JSX.Element => {
  const { loading, error, data } = useQuery(ME);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <Redirect to="/" />;
  }

  const loggedIn = data?.me?.id !== undefined;

  if (loggedIn) {
    return <Route {...rest} render={() => children} />;
  } else {
    return <Redirect to="/" />;
  }
};
