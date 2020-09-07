import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { GetElectionsQuery } from "../../queries/GetElections";
import { GetElections } from "../../queries/types/GetElections";
import { EasyGrid } from "../cards/easyGrid";
import { ElectionPanel } from "./electionPanel";
import styles from "./elections.module.scss";

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
      {
        data!.elections.length === 0 ?
          <div className={`d-flex justify-content-center align-items-center ${styles["container-center"]}`}>
            <p>Nothing to see here.</p>
          </div>
          :
          <EasyGrid>
            {
              data?.elections.map(election => {
                return <ElectionPanel
                  key={election.id}
                  id={election.id}
                  name={election.name}
                  description={election.description}
                  slug={election.slug} />;
              })
            }
          </EasyGrid>
      }
    </Container>
  );
};
