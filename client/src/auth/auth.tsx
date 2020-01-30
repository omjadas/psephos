import React, { Component } from "react";
import { Modal, Tab, Nav } from "react-bootstrap";
import { SignIn } from "./signIn/signIn";
import { Register } from "./register/register";

export interface AuthProps {
  show: boolean,
  onHide: () => any,
}

export class Auth extends Component<AuthProps> {
  public render(): JSX.Element {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide} centered>
          <Tab.Container id="auth" defaultActiveKey="signIn">
            <Modal.Header closeButton>
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
              <SignIn />
              <Register />
            </Tab.Content>
          </Tab.Container>
        </Modal>
      </div>
    );
  }
}
