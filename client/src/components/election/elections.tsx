import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { GetElectionsQuery } from "../../queries/GetElections";
import { MeQuery } from "../../queries/Me";
import { GetElections } from "../../queries/types/GetElections";
import { Me } from "../../queries/types/Me";
import { EasyGrid } from "../cards/easyGrid";
import { ElectionPanel } from "./electionPanel";
import styles from "./elections.module.scss";

export const Elections = (): JSX.Element => {
  const {
    loading: loadingElections,
    error: errorElections,
    data: elections,
  } = useQuery<GetElections>(
    GetElectionsQuery,
    { errorPolicy: "all" }
  );
  const {
    loading: loadingMe,
    error: errorMe,
    data: me,
  } = useQuery<Me>(MeQuery);

  if (loadingElections || loadingMe) {
    return (
      <Container>
        <Spinner className="d-flex mx-auto spinner" animation="border" />
      </Container>
    );
  }

  if (errorElections || errorMe) {
    return <>Failed to load elections.</>;
  }

  return (
    <Container className="mt-2">
      {
        elections!.elections.length === 0 ?
          <div className={`d-flex justify-content-center align-items-center ${styles["container-center"]}`}>
            <p>Nothing to see here.</p>
          </div>
          :
          <EasyGrid>
            {
              elections?.elections.map(election => {
                return <ElectionPanel
                  key={election.id}
                  id={election.id}
                  name={election.name}
                  description={election.description}
                  slug={election.slug}
                  showButtons={election.creator.id === me!.me.id} />;
              })
            }
          </EasyGrid>
      }
    </Container>
  );
};
