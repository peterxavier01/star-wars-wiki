import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Specie from "./Specie";

const fetchSpecies = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/species/?page=${page}`);
  return res.json();
};

const Species = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["species", page],
    () => fetchSpecies(page),
    {
      keepPreviousData: true,
    }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(["species", page + 1], () =>
        fetchSpecies(page + 1)
      );
    }
  }, [data, page, queryClient]);

  return (
    <div>
      <h2>Species</h2>
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
            {data.results?.map((specie) => (
              <Specie key={specie.name} specie={specie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Species;
