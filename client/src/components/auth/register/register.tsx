import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { client } from "../../../apollo";

interface Props {
  onHide: () => any,
}

interface FormValues {
  name: string,
  email: string,
  password1: string,
  password2: string,
}

export const Register = (props: Props): JSX.Element => {
  const [cookies, , ] = useCookies([]);

  const onSubmit = (values: FormValues): Promise<any> => {
    if (values.password1 === values.password2) {
      return fetch("/auth/register", {
        method: "post",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password1,
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
    } else {
      // TODO: display error
      console.error("passwords do not match");
      return Promise.reject();
    }
  };

  return (
    <Tab.Pane eventKey="register">
      <Formik
        initialValues={{ name: "", email: "", password1: "", password2: "" }}
        onSubmit={onSubmit}
      >
        {
          ({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              id="register"
              className="align-self-center"
              onSubmit={handleSubmit as any}
            >
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="name"
                    name="name"
                    placeholder="Enter name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password1"
                    placeholder="Enter password"
                    value={values.password1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password2"
                    placeholder="Enter password"
                    value={values.password2}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button className="mr-auto" href="/auth/google">
                  <FontAwesomeIcon icon={faGoogle} /> Register with Google
                </Button>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  Register
                </Button>
              </Modal.Footer>
            </Form>
          )
        }
      </Formik>
    </Tab.Pane>
  );
};
