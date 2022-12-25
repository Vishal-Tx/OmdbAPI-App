import InfiniteScroll from "react-infinite-scroll-component";

import React, { useState, useMemo } from "react";
import MovieCard from "../Card/MovieCard";
import { Box, TextField, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";

import "./style.css";
import { useMovie } from "../../hooks/useMovie";
import Loader from "../Loader/Loader";

const OmdbContainer = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [apiSearchTerm, setApiSearchTerm] = useState("");

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 10);
  }, []);

  const dict = [
    "Love",
    "war",
    "red",
    "heart",
    "Black",
    "stone",
    "alone",
    "christmas",
    "dragon",
    "fight",
  ];

  let sTerm = dict[randomNumber];

  const { movies, hasNextPage, fetchNextPage, error, isLoading } = useMovie(
    `Movies-${apiSearchTerm || sTerm}`,
    { s: apiSearchTerm || sTerm }
  );

  const filteredMovies = movies.filter((movie) => {
    const regex = new RegExp(localSearchTerm, "i");
    return regex.test(movie.Title);
  });

  const handleLocalSearch = (event) => {
    setLocalSearchTerm(event.target.value);
  };
  console.log(movies);
  return (
    <>
      <Navbar setApiSearchTerm={setApiSearchTerm} />
      <Box
        sx={{
          ml: { lg: "50px" },
          mt: "10px",
          display: "flex",
          justifyContent: { lg: "flex-start", xs: "center" },
        }}
      >
        <Typography className="searchTitle" variant="h4">
          Searching for{" "}
          <span style={{ color: "white" }}>
            {apiSearchTerm.length > 0 ? apiSearchTerm : sTerm}
          </span>
          <span style={{ color: "red" }}>*</span>
        </Typography>
      </Box>
      {error ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography>{error?.message ?? ""}</Typography>
        </Box>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              label="Filter Results"
              variant="filled"
              value={localSearchTerm}
              onChange={handleLocalSearch}
              sx={{
                m: "auto",
                backgroundColor: "white",
                width: "50%",
                color: "black",
                borderRadius: "4px",
                borderColor: "red",
                "& label.Mui-focused": {
                  color: "#3C2A21",
                },
              }}
            />
          </Box>
          <InfiniteScroll
            dataLength={filteredMovies?.length}
            next={fetchNextPage}
            hasMore={hasNextPage && localSearchTerm.length === 0}
            loader={<Loader />}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {filteredMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie?.imdbID} />
              ))}{" "}
            </Box>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default OmdbContainer;
