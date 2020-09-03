import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { client } from "../../../apollo";

interface Props {
  onHide: () => any,
}

interface FormValues {
  email: string,
  password: string,
}

const SignInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const SignIn = (props: Props): JSX.Element => {
  const [cookies, , ] = useCookies([]);

  const onSubmit = (values: FormValues): Promise<any> => {
    return fetch("/auth/local", {
      method: "post",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
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
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={SignInSchema}
      >
        {
          ({
            values,
            handleChange,
            handleSubmit,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form
              id="signIn"
              className="align-self-center"
              onSubmit={handleSubmit as any}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button className="mr-auto" href="/auth/google">
                  <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
                </Button>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  Sign In
                </Button>
              </Modal.Footer>
            </Form>
          )
        }
      </Formik>
    </Tab.Pane>
  );
};
