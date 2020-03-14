import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { client } from "./apollo";
import "./App.css";
import { Header } from "./header/header";
import { Profile } from "./user/profile";

export const App = (_props: any): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};
