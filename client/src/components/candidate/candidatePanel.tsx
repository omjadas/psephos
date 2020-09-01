import { useMutation } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { DeleteCandidateMutation } from "../../queries/DeleteCandidate";
import { GetElectionQuery } from "../../queries/GetElection";
import { DeleteCandidate, DeleteCandidateVariables } from "../../queries/types/DeleteCandidate";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import styles from "./candidatePanel.module.scss";

export interface CandidatePanelProps {
  id: string,
  name: string,
  description: string,
  electionSlug: string,
}

export const CandidatePanel = (props: CandidatePanelProps): JSX.Element => {
  const [deleteCandidate, { loading }] = useMutation<DeleteCandidate, DeleteCandidateVariables>(
    DeleteCandidateMutation
  );

  const onClick = (): void => {
    deleteCandidate({
      variables: {
        id: props.id,
      },
      update: (cache, { data }): void => {
        try {
          const election = cache.readQuery<GetElection, GetElectionVariables>({
            query: GetElectionQuery,
            variables: {
              slug: props.electionSlug,
            },
          });
          if (data?.deleteCandidate === true && election?.election !== undefined) {
            cache.writeQuery<GetElection, GetElectionVariables>({
              query: GetElectionQuery,
              variables: {
                slug: props.electionSlug,
              },
              data: {
                election: {
                  ...election.election,
                  candidates: election.election.candidates.filter(candidate => {
                    return candidate.id !== props.id;
                  }),
                },
              },
            });
          }
        } catch (e: unknown) {
          // do nothing
        }
      },
    });
  };

  return (
    <Card>
      <Card.Body>
        <Button
          className="ml-auto float-right"
          variant="danger"
          onClick={onClick}
          disabled={loading}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Card.Title className={styles.name}>
          {props.name}
        </Card.Title>
        <Card.Text className={styles.description}>
          {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
