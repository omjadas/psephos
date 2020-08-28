import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CreateCandidateMutation } from "../../queries/CreateCandidate";
import { GetElectionQuery } from "../../queries/GetElection";
import { CreateCandidate, CreateCandidateVariables } from "../../queries/types/CreateCandidate";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";

export interface CandidateModalProps {
  id?: string,
  name?: string,
  description?: string,
  electionId: string,
  electionSlug: string,
  show: boolean,
  onHide: () => any,
}

export const CandidateModal = (props: CandidateModalProps): JSX.Element => {
  const [name, setName] = useState(props.name ?? "");
  const [description, setDescription] = useState(props.description ?? "");
  const [createCandidate, { loading }] = useMutation<CreateCandidate, CreateCandidateVariables>(
    CreateCandidateMutation,
    { errorPolicy: "all" }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (props.id === undefined) {
      createCandidate({
        variables: {
          name: name,
          description: description,
          election: props.electionId,
        },
        update: (cache, { data }) => {
          try {
            const election = cache.readQuery<GetElection, GetElectionVariables>({
              query: GetElectionQuery,
              variables: {
                slug: props.electionSlug,
              },
            });

            if (
              data?.createCandidate !== undefined &&
              election?.election !== undefined
            ) {
              cache.writeQuery<GetElection, GetElectionVariables>({
                query: GetElectionQuery,
                variables: {
                  slug: props.electionSlug,
                },
                data: {
                  election: {
                    ...election.election,
                    candidates: [
                      ...election.election.candidates,
                      data.createCandidate,
                    ],
                  },
                },
              });
            }
          } catch (e: unknown) {
            // do nothing
          }
        },
      }).then(() => {
        props.onHide();
      });
    } else {
      // update
    }
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
            Create Candidate
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
