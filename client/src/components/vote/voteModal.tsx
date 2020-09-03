import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";

interface Candidate {
  id: string,
  name: string,
}

export interface VoteModalProps {
  show: boolean,
  onHide: () => any,
  candidates: Candidate[],
}

type VoteValues = Record<string, string>;

export const VoteModal = (props: VoteModalProps): JSX.Element => {
  const handleSubmit = (values: VoteValues): Promise<any> => {
    console.log(JSON.stringify(values));
    return Promise.resolve();
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
