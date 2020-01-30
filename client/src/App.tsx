import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./header/header";

export class App extends Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
