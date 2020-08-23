import React, { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { client } from "../../apollo";
import { useLoginStatus } from "../../hooks/loggedIn";
import { Auth } from "../auth/auth";
import { ElectionModal } from "../election/electionModal";

export const Header = (_props: any): JSX.Element => {
  const [authModalShow, setAuthModalShow] = useState(false);
  const [electionModalShow, setElectionModalShow] = useState(false);
  const loggedIn = useLoginStatus();

  let buttons: JSX.Element[];

  if (loggedIn === null) {
    buttons = [];
  } else if (loggedIn) {
    buttons = [
      <Button
        key="createElection"
        onClick={() => setElectionModalShow(true)}
      >+ Election</Button>,
      <Button
        key="signOut"
        variant="outline-info"
        onClick={() => {
          fetch("/auth/signout", {
            method: "post"
          }).then(() => {
            client.resetStore();
          }).catch();
        }}
      >Sign Out</Button>,
    ];
  } else {
    buttons = [
      <Button
        key="signIn"
        variant="outline-info"
        onClick={() => setAuthModalShow(true)}
      >Sign In / Register</Button>
    ];
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="mr-auto" href="/">Psephos</Navbar.Brand>
      <Form inline>
        {buttons}
      </Form>
      <ElectionModal
        show={electionModalShow}
        onHide={() => setElectionModalShow(false)}
      />
      <Auth show={authModalShow} onHide={() => setAuthModalShow(false)} />
    </Navbar>
  );
};
