import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { FormikControl } from "formik-react-bootstrap";
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

const FormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const SignIn = (props: Props): JSX.Element => {
  const [cookies] = useCookies([]);

  const onSubmit = (values: FormValues): Promise<any> => {
    return fetch("/auth/local", {
      method: "post",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": cookies["CSRF-TOKEN"] as string,
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
        validationSchema={FormSchema}
      >
        {
          ({
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              id="signIn"
              onSubmit={handleSubmit}>
              <Modal.Body>
                <FormikControl
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                />
                <FormikControl
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
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
