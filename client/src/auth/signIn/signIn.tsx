import React from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";

export const SignIn = (_props: any): JSX.Element => {
  return (
    <Tab.Pane eventKey="signIn">
      <Form
        id="signIn"
        className="align-self-center"
        action="auth/local"
        method="post"
        encType="x-www-form-urlencoded"
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">
            Sign In
          </Button>
        </Modal.Footer>
      </Form>
    </Tab.Pane>
  );
};
