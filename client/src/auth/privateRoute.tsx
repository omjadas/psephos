import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useLoginStatus } from "../hooks/loggedIn";

export const PrivateRoute = ({ children, ...rest }: RouteProps): JSX.Element => {
  const loggedIn = useLoginStatus();

  if (loggedIn === null) {
    return <></>;
  }

  if (loggedIn) {
    return <Route {...rest} render={() => children} />;
  } else {
    return <Redirect to="/" />;
  }
};
