import React, { Component } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { SignIn } from "../signIn/SignIn";

interface State {
  modalShow: boolean,
}

export class Header extends Component<any, State> {
  public constructor(props: any) {
    super(props);

    this.state = {
      modalShow: false,
    };

    this.setModalShow.bind(this);
  }

  private setModalShow(show: boolean): void {
    console.log("set");
    this.setState({ modalShow: show });
  }

  public render(): JSX.Element {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="mr-auto" href="/">Psephos</Navbar.Brand>
        <Form inline>
          <Button variant="outline-info" onClick={() => this.setModalShow(true)}>Sign In / Register</Button>
        </Form>
        <SignIn show={this.state.modalShow} onHide={() => this.setModalShow(false)}/>
      </Navbar>
    );
  }
}
