import { useMutation, useQuery } from "@apollo/client";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { CountVotesMutation } from "../../queries/CountVotes";
import { GetElectionQuery } from "../../queries/GetElection";
import { CountVotes, CountVotesVariables } from "../../queries/types/CountVotes";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import { CandidateModal } from "../candidate/candidateModal";
import { CandidatePanel } from "../candidate/candidatePanel";
import { WinnerModal } from "../candidate/winnerModal";
import { EasyGrid } from "../cards/easyGrid";
import { VoteModal } from "../vote/voteModal";
import styles from "./election.module.scss";
import { ElectionModal } from "./electionModal";

export const Election = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [electionModalShow, setElectionModalShow] = useState(false);
  const [candidateModalShow, setCandidateModalShow] = useState(false);
  const [voteModalShow, setVoteModalShow] = useState(false);
  const [winnerModalShow, setWinnerModalShow] = useState(false);
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

  if (new Date(data?.election.finishTime) < now) {
    button = (
      <Button
        className="float-right"
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
      {
        new Date(data!.election.startTime) > now &&
          <>
            <Button
              className={`float-right ${styles["candidate-button"]}`}
              onClick={() => setCandidateModalShow(true)}>
              + Candidate
            </Button>
            <Button
              className={`float-right mr-2 ${styles["election-button"]}`}
              onClick={() => setElectionModalShow(true)}>
              <FontAwesomeIcon icon={faEdit}/>
            </Button>
          </>
      }
      {
        new Date(data!.election.finishTime) < now &&
          <Button
            className={`float-right ${styles["candidate-button"]}`}
            onClick={() => setWinnerModalShow(true)}>
            View Winners
          </Button>
      }
      <Jumbotron>
        <h1>{data?.election.name}</h1>
        <p className="text-muted">Created by {data?.election.creator.name}</p>
        <p>{data?.election.description}</p>
        {button}
      </Jumbotron>
      <ElectionModal
        id={data!.election.id}
        name={data!.election.name}
        seats={data!.election.seats}
        startTime={data!.election.startTime}
        finishTime={data!.election.finishTime}
        description={data!.election.description}
        show={electionModalShow}
        onHide={() => setElectionModalShow(false)} />
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
      <WinnerModal
        show={winnerModalShow}
        onHide={() => setWinnerModalShow(false)}
        winners={data!.election.candidates.filter(c => c.elected === true)} />
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
