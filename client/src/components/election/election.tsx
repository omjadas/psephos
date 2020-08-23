import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { GetElectionQuery } from "../../queries/GetElection";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";

export const Election = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const {} = useQuery<GetElection, GetElectionVariables>(GetElectionQuery, {
    variables: {
      slug: slug,
    }
  });

  return <></>;
};
