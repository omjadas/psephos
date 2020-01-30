import React from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";

export const Register = (_props: any): JSX.Element => {
  return (
    <Tab.Pane eventKey="register">
      <Form
        id="register"
        className="align-self-center"
        action="auth/register"
        method="post"
        encType="x-www-form-urlencoded"
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control type="name" name="name" placeholder="Enter name" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Tab.Pane>
  );
};
