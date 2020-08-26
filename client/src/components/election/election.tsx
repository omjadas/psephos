import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { GetElectionQuery } from "../../queries/GetElection";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import { CandidateModal } from "../candidate/candidateModal";
import { CandidatePanel } from "../candidate/candidatePanel";
import { EasyGrid } from "../cards/easyGrid";

export const Election = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [candidateModalShow, setCandidateModalShow] = useState(false);
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
        <h1>{data?.election.name}</h1>
        <p className="text-muted">Created by {data?.election.creator.name}</p>
        <p>{data?.election.description}</p>
        <Button
          className="float-right"
          onClick={() => setCandidateModalShow(true)}>
          + Candidate
        </Button>
      </Jumbotron>
      <CandidateModal
        electionId={data?.election.id as string}
        electionSlug={slug}
        show={candidateModalShow}
        onHide={() => setCandidateModalShow(false)} />
      <EasyGrid>
        {
          data?.election.candidates.map(candidate => {
            return <CandidatePanel
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              description={candidate.description}
              electionSlug={slug} />;
          })
        }
      </EasyGrid>
    </Container>
  );
};
