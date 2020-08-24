import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
          <Link to={`/elections/${props.slug}`}>
            {props.name}
          </Link>
        </Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
