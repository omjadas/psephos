import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CreateCandidateMutation } from "../../queries/CreateCandidate";
import { CreateCandidate, CreateCandidateVariables } from "../../queries/types/CreateCandidate";

export interface CandidateModalProps {
  electionId: string,
  electionSlug: string,
  show: boolean,
  onHide: () => any,
}

export const CandidateModal = (props: CandidateModalProps): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createCandidate, { loading }] = useMutation<CreateCandidate, CreateCandidateVariables>(
    CreateCandidateMutation,
    { errorPolicy: "all" }
  );

  const onChange = (
    e: any,
    set: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    set.call(
      undefined,
      (e as React.ChangeEvent<HTMLInputElement>).currentTarget.value ?? ""
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createCandidate({
      variables: {
        name: name,
        description: description,
        election: props.electionId,
      },
      update: (cache, { data }) => {
      },
    });
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Election</Modal.Title>
      </Modal.Header>
      <Form id="createElection" onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e: any) => onChange(e, setName)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={(e: any) => onChange(e, setDescription)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success" disabled={loading}>
            Create Candidate
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
