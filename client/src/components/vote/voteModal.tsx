import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { CreateVoteMutation } from "../../queries/CreateVote";
import { CreateVote, CreateVoteVariables } from "../../queries/types/CreateVote";

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

export const VoteModal = (props: VoteModalProps): JSX.Element => {
  const [createVote] = useMutation<CreateVote, CreateVoteVariables>(CreateVoteMutation);

  const handleSubmit = (values: FormValues): Promise<any> => {
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
        onSubmit={handleSubmit}>
        {
          ({
            values,
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
                            type="number"
                            min={1}
                            max={props.candidates.length}
                            value={values[candidate.id]}
                            onChange={handleChange}
                            name={candidate.id} />
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
