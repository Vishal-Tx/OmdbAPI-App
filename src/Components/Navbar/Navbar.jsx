import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Navbar = ({ handleLocalSearch, localSearchTerm }) => {
  const [apiSearchTerm, setApiSearchTerm] = useState("");

  // const handleApiSearch = (event) => {
  //   setApiSearchTerm(event.target.value);
  //   setPage(1);
  //   setMovies([]);
  //   console.log("apiSearchTerm", apiSearchTerm);
  //   axios
  //     .get(
  //       `http://www.omdbapi.com/?apikey=667984e7&s=${apiSearchTerm}&page=${page}`
  //     )
  //     .then((response) => {
  //       console.log("odresponse", response);
  //       setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
  //       // setHasMore(response.data.Search.length > 0);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
      <a href="/">
        <Typography variant="h4">Moviezzz</Typography>
      </a>
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
