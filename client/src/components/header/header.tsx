import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { client } from "../../apollo";
import { useLoginStatus } from "../../hooks/loggedIn";
import { Auth } from "../auth/auth";
import { ElectionModal } from "../election/electionModal";

export const Header = (): JSX.Element => {
  const [authModalShow, setAuthModalShow] = useState(false);
  const [electionModalShow, setElectionModalShow] = useState(false);
  const loggedIn = useLoginStatus();

  let buttons: JSX.Element;

  if (loggedIn === null) {
    buttons = <></>;
  } else if (loggedIn) {
    buttons =
      <>
        <Button
          onClick={() => setElectionModalShow(true)}
          className="mr-2">
          + Election
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            fetch("/auth/signout", {
              method: "post",
            }).then(() => {
              client.resetStore();
            }).catch();
          }}>
          Sign Out
        </Button>
      </>;
  } else {
    buttons =
      <Button
        variant="outline-info"
        onClick={() => setAuthModalShow(true)}>
        Sign In / Register
      </Button>;
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/">Psephos</Link>
        {
          loggedIn &&
            <Nav>
              <Link className="nav-link" to="/elections">Elections</Link>
            </Nav>
        }
        <Form className="ml-auto" inline>
          {buttons}
        </Form>
        <ElectionModal
          show={electionModalShow}
          onHide={() => setElectionModalShow(false)} />
        <Auth show={authModalShow} onHide={() => setAuthModalShow(false)} />
      </Container>
    </Navbar>
  );
};
