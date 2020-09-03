import React from "react";
import { Col, Form, Modal } from "react-bootstrap";

interface Candidate {
  id: string,
  name: string,
}

export interface VoteModalProps {
  show: boolean,
  onHide: () => any,
  candidates: Candidate[],
}

export const VoteModal = (props: VoteModalProps): JSX.Element => {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Your Preferences</Modal.Title>
      </Modal.Header>
      <Form id="vote">
        <Modal.Body>
          {
            props.candidates.map(candidate => {
              return (
                <Form.Row>
                  <Col sm="2">
                    <Form.Control
                      type="number"
                      name={candidate.name} />
                  </Col>
                  <Form.Label column>
                    {candidate.name}
                  </Form.Label>
                </Form.Row>
              );
            })
          }
        </Modal.Body>
      </Form>
    </Modal>
  );
};
