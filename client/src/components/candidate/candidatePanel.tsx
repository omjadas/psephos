import React from "react";
import { Card } from "react-bootstrap";
import styles from "./candidatePanel.module.scss";

export interface CandidatePanelProps {
  name: string,
  description: string,
}

export const CandidatePanel = (props: CandidatePanelProps): JSX.Element => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className={styles.name}>
          {props.name}
        </Card.Title>
        <Card.Text className={styles.description}>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
