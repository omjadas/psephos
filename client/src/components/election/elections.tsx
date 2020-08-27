import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { GetElectionsQuery } from "../../queries/GetElections";
import { GetElections } from "../../queries/types/GetElections";
import { EasyGrid } from "../cards/easyGrid";
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
    <Container className="mt-2">
      <EasyGrid>
        {
          data?.elections.map(election => {
            return <ElectionPanel
              key={election.id}
              name={election.name}
              description={election.description}
              slug={election.slug} />;
          })
        }
      </EasyGrid>
    </Container>
  );
};
