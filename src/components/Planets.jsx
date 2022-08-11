import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Planet from "./Planet";

const fetchPlanets = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
    }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(["planets", page + 1], () =>
        fetchPlanets(page + 1)
      );
    }
  }, [data, page, queryClient]);

  return (
    <div>
      <h2>Planets</h2>
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
            // Disable the Next Page button until we know a next page is available
            disabled={isPreviousData || !data?.next}
          >
            Next
          </button>
          <div>
            {data.results?.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
