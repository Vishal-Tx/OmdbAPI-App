import InfiniteScroll from "react-infinite-scroll-component";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import data from "../../assets/data.json";
import MovieCard from "../Card/MovieCard";
import {
  Box,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";

import "./style.css";
import { useMovie } from "../../hooks/useMovie";

const OmdbContainer = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [apiSearchTerm, setApiSearchTerm] = useState("");

  const { movies, hasNextPage, fetchNextPage, error } = useMovie(
    `Movies-${apiSearchTerm}`,
    { s: apiSearchTerm }
  );

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 5);
  }, []);

  const dict = ["Love", "war", "red", "heart", "Black"];

  let sTerm = dict[randomNumber];

  useEffect(() => {
    if (apiSearchTerm.length === 0) setApiSearchTerm(sTerm);
  }, [apiSearchTerm]);

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
      ) : (
        <div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Input
              style={{ margin: "auto" }}
              type="text"
              value={localSearchTerm}
              onChange={handleLocalSearch}
              placeholder="Search among fetched results..."
            /> */}
            <TextField
              size="small"
              label="Filter Results"
              id="fullWidth"
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
            {/* <input
            type="text"
            value={apiSearchTerm}
            onChange={handleApiSearch}
            placeholder="Search OMDb API..."
          /> */}
            {/* <input
              type="text"
              value={localSearchTerm}
              onChange={handleLocalSearch}
              placeholder="Search among fetched results..."
            /> */}
          </Box>
          <InfiniteScroll
            dataLength={filteredMovies?.length}
            next={fetchNextPage}
            hasMore={hasNextPage && localSearchTerm.length === 0}
            loader={
              <Box
                sx={{
                  height: "50px",
                  textAlign: "center",
                }}
              >
                <CircularProgress sixe={100} />
              </Box>
            }
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
