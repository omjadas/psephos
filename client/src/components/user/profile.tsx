import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { MeQuery } from "../../queries/Me";
import { Me } from "../../queries/types/Me";

export const Profile = (): JSX.Element => {
  const { loading, error, data } = useQuery<Me>(
    MeQuery,
    { errorPolicy: "all" },
  );

  if (loading) {
    return (
      <Container>
        <Spinner className="d-flex mx-auto spinner" animation="border" />
      </Container>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      User ID: {data?.me.id}
    </div>
  );
};
