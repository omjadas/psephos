import React, { Component } from "react";
import { Form, Button, Modal, Tab, Nav } from "react-bootstrap";

export interface SignInProps {
  show: boolean,
  onHide: () => any,
}

interface State {
  key: string,
  email: string,
  name: string,
  password1: string,
  password2: string,
}

export class SignIn extends Component<SignInProps, State> {
  public constructor(props: SignInProps) {
    super(props);

    this.state = {
      key: "signIn",
      email: "",
      name: "",
      password1: "",
      password2: "",
    };

    this.selectTab.bind(this);
  }

  private selectTab(key: string): void {
    this.setState({ key: key });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide} centered>
          <Tab.Container id="auth" defaultActiveKey="signIn">
            <Modal.Header>
              <Nav variant="pills" className="flex-row">
                <Nav.Item className="p-1">
                  <Nav.Link eventKey="signIn" className="px-3 py-2">Sign In</Nav.Link>
                </Nav.Item>
                <Nav.Item className="p-1">
                  <Nav.Link eventKey="register" className="px-3 py-2">Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Header>
            <Tab.Content>
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
            </Tab.Content>
          </Tab.Container>
        </Modal>
      </div>
    );
  }
}
