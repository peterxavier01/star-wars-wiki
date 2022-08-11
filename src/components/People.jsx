import React, { useState, useEffect } from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";

import Person from "./Person";

const fetchPeople = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const queryClient = new QueryClient();
  const [page, setPage] = useState(1);

  const { data, status, isPreviousData } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    {
      keepPreviousData: true,
    }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(["people", page + 1], () =>
        fetchPeople(page + 1)
      );
    }
  }, [data, page, queryClient]);

  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>Fetching data</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() =>
              setPage((currentPage) => Math.max(currentPage - 1, 1))
            }
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="current-page">{page}</span>
          <button
            onClick={() =>
              setPage((currentPage) =>
                !data || !data?.next ? currentPage : currentPage + 1
              )
            }
            disabled={isPreviousData || !data?.next}
          >
            Next
          </button>
          <div>
            {data?.results?.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
