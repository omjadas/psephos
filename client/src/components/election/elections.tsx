import { useQuery } from "@apollo/client";
import React from "react";
import { CardColumns, Container, Spinner } from "react-bootstrap";
import { GetElectionsQuery } from "../../queries/GetElections";
import { GetElections } from "../../queries/types/GetElections";
import { ElectionPanel } from "./electionPanel";

export const Elections = (): JSX.Element => {
  const { loading, error, data } = useQuery<GetElections>(
    GetElectionsQuery,
    { errorPolicy: "all" }
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
      <CardColumns>
        {
          data?.elections.map(election => {
            return <ElectionPanel
              key={election.id}
              name={election.name}
              description={election.description}
              slug={election.slug} />;
          })
        }
      </CardColumns>
    </Container>
  );
};
