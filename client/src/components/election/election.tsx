import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useParams } from "react-router";
import { GetElectionQuery } from "../../queries/GetElection";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";

export const Election = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, data } = useQuery<GetElection, GetElectionVariables>(
    GetElectionQuery,
    {
      errorPolicy: "all",
      variables: {
        slug: slug,
      },
    }
  );

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return (
    <Container className="mt-3">
      <Jumbotron>
        <h1>{data?.election.name}</h1>
        <p className="text-muted">Created by {data?.election.creator.name}</p>
        <p>{data?.election.description}</p>
      </Jumbotron>
    </Container>
  );
};
