import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { client } from "./apollo";
import "./App.scss";
import { PrivateRoute } from "./components/auth/privateRoute";
import { Candidate } from "./components/candidate/candidate";
import { Election } from "./components/election/election";
import { Elections } from "./components/election/elections";
import { Header } from "./components/header/header";
import { Home } from "./components/home/home";
import { Profile } from "./components/user/profile";

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/elections">
              <Elections />
            </PrivateRoute>
            <PrivateRoute exact path="/elections/:slug">
              <Election />
            </PrivateRoute>
            <PrivateRoute exact path="/candidates/:slug">
              <Candidate />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};
