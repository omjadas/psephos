import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { client } from "../../../apollo";

interface Props {
  onHide: () => any,
}

export const SignIn = (props: Props): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [cookies, , ] = useCookies([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setDisabled(true);
    fetch("/auth/local", {
      method: "post",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": cookies["CSRF-TOKEN"],
      },
    }).then(res => {
      if (res.status === 200) {
        props.onHide();
        return client.resetStore();
      } else {
        // TODO: handle error codes
      }
    }).catch();
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
              onChange={e => setEmail(e.currentTarget.value ?? "")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={e => setPassword(e.currentTarget.value ?? "")}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-auto" href="/auth/google">
            <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
          </Button>
          <Button type="submit" variant="success" disabled={disabled}>
            Sign In
          </Button>
        </Modal.Footer>
      </Form>
    </Tab.Pane>
  );
};
