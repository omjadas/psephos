import { useQuery } from "@apollo/client";
import React from "react";
import { GetElectionsQuery } from "../../queries/GetElections";
import { GetElections } from "../../queries/types/GetElections";
import { ElectionPanel } from "./electionPanel";
import { Container } from "react-bootstrap";

export const Elections = (): JSX.Element => {
  const { loading, error, data } = useQuery<GetElections>(GetElectionsQuery);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return (
    <Container>
      {
        data?.elections.map(election => {
          return <ElectionPanel
            key={election.id}
            name={election.name}
            description={election.description} />;
        })
      }
    </Container>
  );
};
