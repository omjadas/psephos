import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { CountVotesMutation } from "../../queries/CountVotes";
import { GetElectionQuery } from "../../queries/GetElection";
import { CountVotes, CountVotesVariables } from "../../queries/types/CountVotes";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import { CandidateModal } from "../candidate/candidateModal";
import { CandidatePanel } from "../candidate/candidatePanel";
import { EasyGrid } from "../cards/easyGrid";
import { VoteModal } from "../vote/voteModal";
import styles from "./election.module.scss";

export const Election = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [candidateModalShow, setCandidateModalShow] = useState(false);
  const [voteModalShow, setVoteModalShow] = useState(false);
  const { loading, error, data } = useQuery<GetElection, GetElectionVariables>(
    GetElectionQuery,
    {
      errorPolicy: "all",
      variables: {
        slug: slug,
      },
    }
  );
  const [countVotes, { loading: mutationLoading }] = useMutation<CountVotes, CountVotesVariables>(
    CountVotesMutation
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

  const onCountVotes = (): void => {
    countVotes({
      variables: {
        id: data!.election.id,
      },
    });
  };

  let button;

  const now = new Date();

  if (data?.election.finishTime !== null && new Date(data?.election.finishTime) < now) {
    button = (
      <Button
        className="float-right mr-2"
        onClick={onCountVotes}
        disabled={mutationLoading}>
        Count Votes
      </Button>
    );
  } else if (new Date(data?.election.startTime) < now) {
    button = (
      <Button
        className="float-right"
        onClick={() => setVoteModalShow(true)}>
        Vote
      </Button>
    );
  }

  return (
    <Container className="mt-3">
      <Button
        className={`float-right ${styles["candidate-button"]}`}
        onClick={() => setCandidateModalShow(true)}>
        + Candidate
      </Button>
      <Jumbotron>
        <h1>{data?.election.name}</h1>
        <p className="text-muted">Created by {data?.election.creator.name}</p>
        <p>{data?.election.description}</p>
        {button}
      </Jumbotron>
      <CandidateModal
        electionId={data!.election.id}
        electionSlug={slug}
        show={candidateModalShow}
        onHide={() => setCandidateModalShow(false)} />
      <VoteModal
        electionId={data!.election.id}
        candidates={data!.election.candidates}
        show={voteModalShow}
        onHide={() => setVoteModalShow(false)} />
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
