import React, { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { Auth } from "../auth/auth";
import { useLoginStatus } from "../hooks/loggedIn";
import { client } from "../apollo";

export const Header = (_props: any): JSX.Element => {
  const [modalShow, setModalShow] = useState(false);
  const loggedIn = useLoginStatus();

  let button: JSX.Element;

  if (loggedIn === null) {
    button = <></>
  } else if (loggedIn) {
    button = <Button
      variant="outline-info"
      onClick={() => {
        fetch("/auth/signout", {
          method: "post"
        }).then(() => {
          client.resetStore()
        }).catch();
      }}
    >Sign Out</Button>
  } else {
    button = <Button
      variant="outline-info"
      onClick={() => setModalShow(true)}>Sign In / Register</Button>
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="mr-auto" href="/">Psephos</Navbar.Brand>
      <Form inline>
        {button}
      </Form>
      <Auth show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  );
};
