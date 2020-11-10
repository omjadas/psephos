import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React from "react";
import { Button, Form, Modal, Tab } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { FormikControl } from "formik-react-bootstrap";
import * as yup from "yup";
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

const FormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password1: yup.string().required("password is a required field"),
  password2: yup.string().test(
    "equal",
    "passwords do not match",
    function(password2) {
      return password2 === this.resolve(yup.ref("password1"));
    }).required(""),
});

export const Register = (props: Props): JSX.Element => {
  const [cookies] = useCookies([]);

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
        validationSchema={FormSchema}
      >
        {
          ({
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              id="register"
              onSubmit={handleSubmit}
            >
              <Modal.Body>
                <FormikControl
                  label="Full name"
                  placeholder="Enter name"
                  name="name" />
                <FormikControl
                  label="Email address"
                  type="email"
                  name="email"
                  placeholder="Enter email" />
                <FormikControl
                  label="Password"
                  type="password"
                  name="password1"
                  placeholder="Enter password" />
                <FormikControl
                  label="Confirm password"
                  type="password"
                  name="password2"
                  placeholder="Enter password" />
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
