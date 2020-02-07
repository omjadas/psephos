import ApolloClient from "apollo-boost";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const client = new ApolloClient({
  uri: "/graphql",
  credentials: "same-origin",
  headers: {
    "CSRF-TOKEN": cookies.get("CSRF-TOKEN"),
  },
});
