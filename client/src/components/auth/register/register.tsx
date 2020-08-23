import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { client } from "../../../apollo";

interface Props {
  onHide: () => any,
}

export const Register = (props: Props): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [cookies, , ] = useCookies([]);

  const onChange = (e: any, set: React.Dispatch<React.SetStateAction<string>>): void => {
    set.call(undefined, (e as React.ChangeEvent<HTMLInputElement>).currentTarget.value ?? "");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password1 === password2) {
      fetch("/auth/register", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password1,
        }),
        headers: {
          "Content-Type": "application/json",
          "CSRF-TOKEN": cookies["CSRF-TOKEN"],
        },
      }).then(res => {
        if (res.status === 200) {
          props.onHide();
          return client.resetStore();
        }
      }).catch();
    } else {
      console.error("passwords do not match");
    }
  };

  return (
    <Tab.Pane eventKey="register">
      <Form
        id="register"
        className="align-self-center"
        action="auth/register"
        method="post"
        encType="x-www-form-urlencoded"
        onSubmit={onSubmit}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter name"
              onChange={(e: any) => onChange(e, setName)}
              required
            />
          </Form.Group>
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
              name="password1"
              placeholder="Enter password"
              onChange={(e: any) => onChange(e, setPassword1)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              placeholder="Enter password"
              onChange={(e: any) => onChange(e, setPassword2)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-auto" href="/auth/google">
            <FontAwesomeIcon icon={faGoogle} /> Register with Google
          </Button>
          <Button type="submit" variant="success">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Tab.Pane>
  );
};
