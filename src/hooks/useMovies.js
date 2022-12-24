import axios from "axios";
import { useEffect, useState } from "react";

export default function useMovies() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const key = import.meta.env.VITE_APP_APIKEY;
  const rootUrl = "http://www.omdbapi.com/";

  const getMovies = async (args) => {
    try {
      if (page === 1) setData([]);
      setIsLoading(true);
      setError(null);
      const params = { apikey: key, page, ...args };

      const qs = new URLSearchParams(params);
      const res = await axios.get(`${rootUrl}?${qs.toString()}`);
      if (res.data.Response === "False") throw new Error(res.data.Error);
      const updatedMovies = [...(data || []), ...(res?.data?.Search || [])];
      console.log(updatedMovies);

      setData(updatedMovies);
      if (updatedMovies.length === res.data.totalResults) setHasMore(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setPage(1);
  };

  return {
    data,
    error,
    isLoading,
    hasMore,
    getMovies,
    clearData,
    setPage,
    page,
  };
}
