import axios from "axios";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export const useMovie = (key, args) => {
  const queryClient = useQueryClient();
  const apiKey = import.meta.env.VITE_APP_APIKEY;
  const rootUrl = "https://www.omdbapi.com/";
  const response = useInfiniteQuery(
    [key],
    async ({ pageParam = 1, signal }) => {
      const params = { apikey: apiKey, page: pageParam, ...args };
      const qs = new URLSearchParams(params);
      console.log("args", args);
      // if (args.s.length === 0) return queryClient.cancelQueries(...args);
      queryClient.cancelQueries(key);
      const d = await axios.get(`${rootUrl}?${qs.toString()}`, { signal });
      if (d?.data?.Response === "False") throw new Error(d.data?.Error);
      return d;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        console.log("lastPage", lastPage);
        console.log("pages", pages);
        if (pages.length * 10 < lastPage?.data.totalResults) {
          return pages.length + 1;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 100000,
      staleTime: 100000,
    }
  );
  console.log("response", response);
  const totalResponse = response?.data?.pages
    ?.map((page) => page?.data?.Search)
    .flat();
  const movies = totalResponse ?? [];

  return { movies, ...response };
};
