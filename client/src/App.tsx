import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { SignIn } from "./signIn/SignIn";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
