import React from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import { Register } from "./register/register";
import { SignIn } from "./signIn/signIn";

export interface AuthProps {
  show: boolean,
  onHide: () => any,
}

export const Auth = (props: AuthProps): JSX.Element => {
  return (
    <div>
      <Modal show={props.show} onHide={props.onHide} centered>
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
            <SignIn onHide={props.onHide} />
            <Register onHide={props.onHide} />
          </Tab.Content>
        </Tab.Container>
      </Modal>
    </div>
  );
};
