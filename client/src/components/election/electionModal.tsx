import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { CreateElectionMutation } from "../../queries/CreateElection";
import { GetElectionsQuery } from "../../queries/GetElections";
import { CreateElection, CreateElectionVariables } from "../../queries/types/CreateElection";
import { GetElections } from "../../queries/types/GetElections";

export interface ElectionModalProps {
  show: boolean,
  onHide: () => any,
}

export const ElectionModal = (props: ElectionModalProps): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const [createElection, { loading }] = useMutation<CreateElection, CreateElectionVariables>(
    CreateElectionMutation,
    { errorPolicy: "all" }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createElection({
      variables: {
        name: name,
        description: description,
      },
      update: (cache, { data }) => {
        try {
          const elections = cache.readQuery<GetElections>({
            query: GetElectionsQuery,
          });

          if (
            data?.createElection !== undefined &&
            elections?.elections !== undefined
          ) {
            cache.writeQuery<GetElections>({
              query: GetElectionsQuery,
              data: {
                elections: [...elections.elections, data.createElection],
              },
            });
          }
        } catch (e: unknown) {
          // do nothing
        }
      },
    }).then(({ data }) => {
      props.onHide();
      history.push(`/elections/${data?.createElection.slug}`);
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
              onChange={e => setName(e.currentTarget.value ?? "")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={e => setDescription(e.currentTarget.value ?? "")} />
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
