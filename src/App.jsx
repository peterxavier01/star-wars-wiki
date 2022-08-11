import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Species from "./components/Species";

const Layout = () => {
  const [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        <h1>Star Wars Wiki</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? (
            <Planets />
          ) : page === "people" ? (
            <People />
          ) : (
            <Species />
          )}
        </div>
      </div>
    </>
  );
};

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Layout />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
