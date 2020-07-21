import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { client } from "./apollo";
import "./App.css";
import { PrivateRoute } from "./auth/privateRoute";
import { Header } from "./header/header";
import { Profile } from "./user/profile";

export const App = (_props: any): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};
