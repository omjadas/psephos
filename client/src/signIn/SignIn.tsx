import React, { Component } from "react";
import GoogleButton from "react-google-button";
import { Form, Button } from "react-bootstrap";

export class SignIn extends Component {
  public render(): JSX.Element {
    return (
      <div>
        <Form
          id="signIn"
          className="align-self-center"
          action="auth/local"
          method="post"
          encType="x-www-form-urlencoded"
        >
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="username" placeholder="Enter email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Button type="submit">
            Sign In
          </Button>
        </Form>
        <GoogleButton onClick={() => {
          window.location.href = "/auth/google";
        }} />
      </div>
    );
  }
}
