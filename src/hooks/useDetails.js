import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getDetail = async (id) => {
  const apiKey = import.meta.env.VITE_APP_APIKEY;
  const rootUrl = "https://www.omdbapi.com/";

  return await axios.get(`${rootUrl}?apikey=${apiKey}&i=${id}`);
};
export const useDetails = (key, arg) => {
  const response = useQuery([key], () => getDetail(arg), {
    cacheTime: 10000000,
    staleTime: 10000000,
    select: (data) => {
      return data?.data;
    },
  });
  return response;
};
