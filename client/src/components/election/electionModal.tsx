import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory, Redirect } from "react-router";
import { CreateElectionMutation } from "../../queries/CreateElection";
import { CreateElection, CreateElectionVariables } from "../../queries/types/CreateElection";

export interface ElectionModalProps {
  show: boolean,
  onHide: () => any,
}

export const ElectionModal = (props: ElectionModalProps): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createElection, { loading, data }] = useMutation<CreateElection, CreateElectionVariables>(CreateElectionMutation);

  const onChange = (e: any, set: React.Dispatch<React.SetStateAction<string>>): void => {
    set.call(undefined, (e as React.ChangeEvent<HTMLInputElement>).currentTarget.value ?? "");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createElection({
      variables: {
        name: name,
        description: description,
      },
    });
  };

  if (data?.createElection.slug !== undefined) {
    return <Redirect to={`/elections/${data.createElection.slug}`} />;
  }

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
              onChange={(e: any) => onChange(e, setName)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={(e: any) => onChange(e, setDescription)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success" disabled={loading}>
            Create Election
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};