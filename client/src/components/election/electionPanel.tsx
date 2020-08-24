import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./electionPanel.module.scss";

export interface ElectionPanelProps {
  name: string,
  description: string,
  slug: string,
}

export const ElectionPanel = (props: ElectionPanelProps): JSX.Element => {
  return (
    <Card>
      <Card.Body>
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
