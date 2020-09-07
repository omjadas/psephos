import { useMutation } from "@apollo/client";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { DeleteCandidateMutation } from "../../queries/DeleteCandidate";
import { GetElectionQuery } from "../../queries/GetElection";
import { DeleteCandidate, DeleteCandidateVariables } from "../../queries/types/DeleteCandidate";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import { CandidateModal } from "./candidateModal";
import styles from "./candidatePanel.module.scss";

export interface CandidatePanelProps {
  id: string,
  name: string,
  description: string,
  electionSlug: string,
  showButtons: boolean,
}

export const CandidatePanel = (props: CandidatePanelProps): JSX.Element => {
  const [candidateModalShow, setCandidateModalShow] = useState(false);
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
    <>
      <Card>
        <Card.Body>
          {
            props.showButtons &&
              <>
                <Button
                  className="ml-auto float-right"
                  variant="danger"
                  onClick={onClick}
                  disabled={loading}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  className="ml-auto mr-2 float-right"
                  onClick={() => setCandidateModalShow(true)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </>
          }
          <Card.Title className={styles.name}>
            {props.name}
          </Card.Title>
          <Card.Text className={styles.description}>
            {props.description}
          </Card.Text>
        </Card.Body>
      </Card>
      <CandidateModal
        id={props.id}
        name={props.name}
        description={props.description}
        show={candidateModalShow}
        onHide={() => setCandidateModalShow(false)} />
    </>
  );
};
