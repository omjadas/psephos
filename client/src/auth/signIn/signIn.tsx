import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";

export const SignIn = (_props: any): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: any, set: React.Dispatch<React.SetStateAction<string>>): void => {
    set.call(undefined, (e as React.ChangeEvent<HTMLInputElement>).currentTarget.value ?? "");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <Tab.Pane eventKey="signIn">
      <Form
        id="signIn"
        className="align-self-center"
        action="auth/local"
        method="post"
        encType="x-www-form-urlencoded"
        onSubmit={onSubmit}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e: any) => onChange(e, setEmail)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e: any) => onChange(e, setPassword)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-auto" href="/auth/google">
            <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
          </Button>
          <Button type="submit" variant="success">
            Sign In
          </Button>
        </Modal.Footer>
      </Form>
    </Tab.Pane>
  );
};
