import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { client } from "./apollo";
import { PrivateRoute } from "./components/auth/privateRoute";
import { Election } from "./components/election/election";
import { Elections } from "./components/election/elections";
import { Header } from "./components/header/header";
import { Profile } from "./components/user/profile";

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/elections">
              <Elections />
            </PrivateRoute>
            <PrivateRoute exact path="/elections/:slug">
              <Election />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};
