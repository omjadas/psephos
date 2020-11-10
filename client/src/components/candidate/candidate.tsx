import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Jumbotron, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { GetCandidateQuery } from "../../queries/GetCandidate";
import { GetCandidate, GetCandidateVariables } from "../../queries/types/GetCandidate";

export const Candidate = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, data } = useQuery<GetCandidate, GetCandidateVariables>(
    GetCandidateQuery,
    {
      variables: {
        slug: slug,
      },
    },
  );

  if (loading) {
    return (
      <Container>
        <Spinner className="d-flex mx-auto spinner" animation="border" />
      </Container>
    );
  }

  if (error) {
    return <></>;
  }

  return (
    <Container className="mt-3">
      <Jumbotron>
        <h1>{data?.candidate.name}</h1>
        <p>{data?.candidate.description}</p>
      </Jumbotron>
    </Container>
  );
};
