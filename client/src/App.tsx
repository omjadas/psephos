import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./header/header";

export const App = (_props: any): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
