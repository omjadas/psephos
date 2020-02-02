import { Environment, Network, RecordSource, RequestParameters, Store, Variables } from "relay-runtime";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function fetchQuery(operation: RequestParameters, variables: Variables): Promise<any> {
  return fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CSRF-TOKEN": cookies.get("CSRF-TOKEN"),
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});
