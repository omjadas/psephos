import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

export const Home = (): JSX.Element => {
  return (
    <Container className="mt-3">
      <Jumbotron>
        <h1>Psephos</h1>
        <p className="text-muted">Host elections online using the Single Transferable Vote voting system.</p>
      </Jumbotron>
    </Container>
  );
};
