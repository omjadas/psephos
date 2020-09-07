import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { CreateVoteMutation } from "../../queries/CreateVote";
import { CreateVote, CreateVoteVariables } from "../../queries/types/CreateVote";
import styles from "./voteModal.module.scss";

interface Candidate {
  id: string,
  name: string,
}

export interface VoteModalProps {
  electionId: string,
  show: boolean,
  onHide: () => any,
  candidates: Candidate[],
}

type FormValues = Record<string, string>;

const FormSchema = yup.lazy((obj: any) => {
  const entries = Object.entries(obj);
  const values = entries.map(entry => entry[1]);
  return yup.object(
    Object.fromEntries(
      entries.map(([key], i, entries) => {
        return [
          key,
          yup
            .number()
            .integer("preferences must be integers")
            .min(
              1,
              "preferences must be greater than or equal to 1"
            )
            .max(
              entries.length,
              `preferences must be less than or equal to ${entries.length}`
            )
            .notOneOf(values.slice(0, i), "preferences must be unique")
            .required("all preferences are required"),
        ];
      })
    )
  );
});

export const VoteModal = (props: VoteModalProps): JSX.Element => {
  const [createVote] = useMutation<CreateVote, CreateVoteVariables>(CreateVoteMutation);

  const onSubmit = (values: FormValues): Promise<any> => {
    return createVote({
      variables: {
        electionId: props.electionId,
        preferences: Object
          .entries(values)
          .map(entry => ({ candidateId: entry[0], preference: parseInt(entry[1]) })),
      },
    }).then(() => {
      props.onHide();
    });
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Your Preferences</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={
          props
            .candidates
            .reduce(
              (obj, val) => {
                return { ...obj, [val.id]: "" };
              },
              {}
            ) as Record<string, string>}
        onSubmit={onSubmit}
        validationSchema={FormSchema}
      >
        {
          ({
            values,
            errors,
            touched,
            handleChange,
            isSubmitting,
            handleSubmit,
          }) => (
            <Form id="vote" onSubmit={handleSubmit as any}>
              <Modal.Body>
                {
                  props.candidates.map(candidate => {
                    return (
                      <Form.Row className="mb-2" key={candidate.id}>
                        <Col sm="2">
                          <Form.Control
                            className={styles.preference}
                            type="number"
                            value={values[candidate.id]}
                            onChange={handleChange}
                            name={candidate.id}
                            isInvalid={!!touched[candidate.id] && !!errors[candidate.id]} />
                          <Form.Control.Feedback className="text-nowrap" type="invalid">
                            {errors[candidate.id]}
                          </Form.Control.Feedback>
                        </Col>
                        <Form.Label column>
                          {candidate.name}
                        </Form.Label>
                      </Form.Row>
                    );
                  })
                }
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          )
        }
      </Formik>
    </Modal>
  );
};
