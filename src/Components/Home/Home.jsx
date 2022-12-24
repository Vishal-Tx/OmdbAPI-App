import InfiniteScroll from "react-infinite-scroll-component";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import data from "../../assets/data.json";
import MovieCard from "../Card/MovieCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import "./style.css";

const OmdbContainer = () => {
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  //   console.log("data", data);

  const currYear = useMemo(
    () => new Date().getFullYear(),
    [new Date().getFullYear()]
  );

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 5);
  }, []);

  const dict = ["Love", "war", "red", "heart", "Black"];

  //   console.log("currYear", currYear);
  //   console.log("randomNumber", randomNumber);
  let sTerm = dict[randomNumber];
  useEffect(() => {
    setIsLoading(true);
    // axios
    //   .get(
    //     `http://www.omddbapi.com/?apikey=667984e7&y=${currYear}&s="${sTerm}"&type="movie"&page=${page}`
    //   )
    //   .then((response) => {
    //     console.log("response", response);
    //     if (response.data?.Response === "False") return setHasMore(false);
    //     else setHasMore(true);
    //     setMovies((prevMovies) => [...prevMovies, ...response?.data?.Search]);

    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setIsLoading(false);
    //     setError("Something went wrong. Please try again!");
    //   });
    // setMovies((prevMovies) => [...prevMovies, ...data]);
    setMovies((prevMovies) => [...data]);
    setHasMore(false);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredMovies = movies.filter((movie) => {
    const regex = new RegExp(localSearchTerm, "i");
    return regex.test(movie.Title);
  });
  console.log("hasMore", hasMore);

  const handleLocalSearch = (event) => {
    setLocalSearchTerm(event.target.value);
  };
  return (
    <>
      <Navbar
        localSearchTerm={localSearchTerm}
        handleLocalSearch={handleLocalSearch}
      />
      {error ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography>{error}</Typography>
        </Box>
      ) : (
        <div>
          <div className="search-container">
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
          </div>
          <InfiniteScroll
            dataLength={filteredMovies.length}
            next={handleLoadMore}
            hasMore={hasMore}
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
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Box
              sx={{
                ml: { lg: "50px" },
                mt: "10px",
                display: "flex",
                justifyContent: { lg: "flex-start", xs: "center" },
              }}
            >
              <Typography className="searchTitle" variant="h4">
                Searching for "<span style={{ color: "white" }}>{sTerm}</span>"
                <span style={{ color: "red" }}>*</span>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {filteredMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}{" "}
            </Box>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default OmdbContainer;
