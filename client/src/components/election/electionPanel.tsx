import { useMutation } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeleteElectionMutation } from "../../queries/DeleteElection";
import { GetElectionsQuery } from "../../queries/GetElections";
import { DeleteElection, DeleteElectionVariables } from "../../queries/types/DeleteElection";
import { GetElections } from "../../queries/types/GetElections";
import styles from "./electionPanel.module.scss";

export interface ElectionPanelProps {
  id: string,
  name: string,
  description: string,
  slug: string,
  showButtons: boolean,
}

export const ElectionPanel = (props: ElectionPanelProps): JSX.Element => {
  const [deleteElection, { loading }] = useMutation<DeleteElection, DeleteElectionVariables>(
    DeleteElectionMutation,
  );

  const onClick = (): Promise<unknown> => {
    return deleteElection({
      variables: {
        id: props.id,
      },
      update: (cache, { data }): void => {
        try {
          const elections = cache.readQuery<GetElections>({
            query: GetElectionsQuery,
            variables: {
              slug: props.slug,
            },
          });
          if (data?.deleteElection === true && elections?.elections !== undefined) {
            cache.writeQuery<GetElections>({
              query: GetElectionsQuery,
              data: {
                elections: elections.elections.filter(election => {
                  return election.id !== props.id;
                }),
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
        {
          props.showButtons &&
            <Button
              className="ml-auto float-right"
              variant="danger"
              onClick={onClick}
              disabled={loading}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
        }
        <Card.Title>
          <Link to={`/elections/${props.slug}`} className={styles.name}>
            {props.name}
          </Link>
        </Card.Title>
        <Card.Text className={styles.description}>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
