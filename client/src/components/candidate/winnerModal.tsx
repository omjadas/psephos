import React from "react";
import { ListGroup, Modal } from "react-bootstrap";

export interface WinnerModalProps {
  show: boolean,
  onHide: () => any,
  winners: { id: string, name: string }[],
}

export const WinnerModal = (props: WinnerModalProps): JSX.Element => {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Winners
        </Modal.Title>
      </Modal.Header>
      <ListGroup variant="flush">
        {
          props.winners.map(winner => {
            return (
              <ListGroup.Item key={winner.id}>{winner.name}</ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </Modal>
  );
};
