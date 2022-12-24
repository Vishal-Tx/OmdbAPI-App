import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = ({
  handleLocalSearch,
  localSearchTerm,
  setMovies,
  setError,
  setApiSearchTerm,
  apiSearchTerm,
}) => {
  const [page, setPage] = useState(1);
  const [debouncer, setDebouncer] = useState("");

  const key = import.meta.env.VITE_APP_APIKEY;

  useEffect(() => {
    let delay = setTimeout(() => {
      if (apiSearchTerm.length > 0) setDebouncer(apiSearchTerm);
    }, 400);

    return () => clearTimeout(delay);
    if (apiSearchTerm.length > 0) handleApiSearch();
  }, [apiSearchTerm]);

  useEffect(() =>)

  const handleChange = (event) => {
    setApiSearchTerm(event.target.value);
  };
  const handleApiSearch = async (event) => {
    setPage(1);
    setMovies([]);
    console.log("apiSearchTerm", apiSearchTerm);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${key}&s=${apiSearchTerm}&page=${page}`
      );
      console.log("response", response);
      if (response?.data?.Response === "False")
        throw new Error(response.data.Error);
      setError(null);
      setMovies((prevMovies) => [
        ...(prevMovies || []),
        ...(response?.data?.Search || []),
      ]);
    } catch (error) {
      setError(error.message);
      // console.log("error", error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        backgroundColor: "#3C2A21",
        color: "white",
        py: 2,
        px: 6,
      }}
    >
      <a
        href="/"
        style={{ textDecoration: "none", color: "white", marginRight: "15px" }}
      >
        <Typography variant="h4">Moviezzz</Typography>
      </a>
      <input
        type="text"
        value={apiSearchTerm}
        onChange={handleChange}
        placeholder="Search OMDb API..."
      />
      <input
        type="text"
        value={localSearchTerm}
        onChange={handleLocalSearch}
        placeholder="Search among fetched results..."
      />
    </Box>
  );
};

export default Navbar;
