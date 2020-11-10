import { useMutation, useQuery } from "@apollo/client";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { CountVotesMutation } from "../../queries/CountVotes";
import { GetElectionQuery } from "../../queries/GetElection";
import { MeQuery } from "../../queries/Me";
import { CountVotes, CountVotesVariables } from "../../queries/types/CountVotes";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import { Me } from "../../queries/types/Me";
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
  const {
    loading: loadingElection,
    error: errorElection,
    data: election,
  } = useQuery<GetElection, GetElectionVariables>(
    GetElectionQuery,
    {
      errorPolicy: "all",
      variables: {
        slug: slug,
      },
    },
  );
  const {
    loading: loadingMe,
    error: errorMe,
    data: me,
  } = useQuery<Me>(MeQuery);
  const [
    countVotes,
    { loading: mutationLoading },
  ] = useMutation<CountVotes, CountVotesVariables>(
    CountVotesMutation,
  );

  if (loadingElection || loadingMe) {
    return (
      <Container>
        <Spinner className="d-flex mx-auto spinner" animation="border" />
      </Container>
    );
  }

  if (errorElection || errorMe) {
    return <>Failed to load election.</>;
  }

  const onCountVotes = (): Promise<unknown> => {
    return countVotes({
      variables: {
        id: election!.election.id,
      },
      update: (cache, { data }) => {
        try {
          const election = cache.readQuery<GetElection, GetElectionVariables>({
            query: GetElectionQuery,
            variables: {
              slug: slug,
            },
          });

          if (
            data?.countVotes !== undefined &&
            election?.election !== undefined
          ) {
            cache.writeQuery<GetElection, GetElectionVariables>({
              query: GetElectionQuery,
              variables: {
                slug: slug,
              },
              data: {
                election: {
                  ...election.election,
                  candidates: data.countVotes,
                },
              },
            });
          }
        } catch (e) {
          // do nothing
        }
      },
    });
  };

  let button = <></>;

  const now = new Date();
  let state = "new";

  if (new Date(election?.election.finishTime) < now) {
    state = "closed";
  } else if (new Date(election?.election.startTime) < now) {
    state = "open";
  }

  if (
    state === "closed" &&
    election!.election.creator.id === me!.me.id
  ) {
    button = (
      <Button
        className="float-right"
        onClick={onCountVotes}
        disabled={mutationLoading}>
        Count Votes
      </Button>
    );
  } else if (
    state === "open" &&
    !me?.me.votedElections.some(el => el.id === election?.election.id)
  ) {
    state = "open";
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
        state === "new" && election!.election.creator.id === me!.me.id &&
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
        state === "closed" &&
          <Button
            className={`float-right ${styles["candidate-button"]}`}
            onClick={() => setWinnerModalShow(true)}>
            View Winners
          </Button>
      }
      <Jumbotron>
        <h1>{election?.election.name}</h1>
        <p className="text-muted">Created by {election?.election.creator.name}</p>
        <p>{election?.election.description}</p>
        {button}
      </Jumbotron>
      <ElectionModal
        id={election!.election.id}
        name={election!.election.name}
        seats={election!.election.seats}
        startTime={election!.election.startTime as string}
        finishTime={election!.election.finishTime as string}
        description={election!.election.description}
        show={electionModalShow}
        onHide={() => setElectionModalShow(false)} />
      <CandidateModal
        electionId={election!.election.id}
        electionSlug={slug}
        show={candidateModalShow}
        onHide={() => setCandidateModalShow(false)} />
      <VoteModal
        electionId={election!.election.id}
        candidates={election!.election.candidates}
        show={voteModalShow}
        onHide={() => setVoteModalShow(false)} />
      <WinnerModal
        show={winnerModalShow}
        onHide={() => setWinnerModalShow(false)}
        winners={election!.election.candidates.filter(c => c.elected === true)} />
      <EasyGrid>
        {
          election?.election.candidates.map(candidate => {
            return <CandidatePanel
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              description={candidate.description}
              electionSlug={slug}
              showButtons={election.election.creator.id === me!.me.id && state === "new"} />;
          })
        }
      </EasyGrid>
    </Container>
  );
};
