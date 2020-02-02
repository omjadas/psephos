import React, { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { Auth } from "../auth/auth";

export const Header = (_props: any): JSX.Element => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="mr-auto" href="/">Psephos</Navbar.Brand>
      <Form inline>
        <Button variant="outline-info" onClick={() => setModalShow(true)}>Sign In / Register</Button>
      </Form>
      <Auth show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  );
};
