import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  credentials: "same-origin",
  headers: {
    "CSRF-TOKEN": cookies.get("CSRF-TOKEN"),
  },
});
