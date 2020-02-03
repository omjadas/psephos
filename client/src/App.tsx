import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./header/header";
import { Profile } from "./user/profile";

export const App = (_props: any): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
