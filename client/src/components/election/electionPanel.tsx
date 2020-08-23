import React from "react";
import { Card } from "react-bootstrap";

export interface ElectionPanelProps {
  name: string,
  description: string,
}

export const ElectionPanel = (props: ElectionPanelProps): JSX.Element => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
