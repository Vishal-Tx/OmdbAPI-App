// import React, { useState, useEffect } from "react";
// import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// const OmdbContainer = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("avenger");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   console.log("Movies", movies);

//   useEffect(() => {
//     setIsLoading(true);
//     axios
//       .get(
//         `http://www.omdbapi.com/?apikey=667984e7&s=${searchTerm}&page=${page}`
//       )
//       .then((response) => {
//         console.log(response);
//         setMovies((prevMovies) => [...prevMovies, ...response?.data?.Search]);
//         setHasMore(response?.data?.Search?.length > 0);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setIsLoading(false);
//       });
//   }, [searchTerm, page]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(1);
//     setMovies([]);
//   };

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder="Search for a movie..."
//       />
//       <InfiniteScroll
//         dataLength={movies?.length}
//         next={handleLoadMore}
//         hasMore={hasMore}
//         loader={<h4>Loading...</h4>}
//         endMessage={
//           <p style={{ textAlign: "center" }}>
//             <b>Yay! You have seen it all</b>
//           </p>
//         }
//       >
//         {movies.map((movie) => (
//           <div key={movie.imdbID}>
//             <h3>{movie.Title}</h3>
//             <p>Year: {movie.Year}</p>
//             <img src={movie.Poster} alt={movie.Title} />
//           </div>
//         ))}
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default OmdbContainer;

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import data from "../../assets/data.json";
import MovieCard from "../Card/MovieCard";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const OmdbContainer = () => {
  const [movies, setMovies] = useState([]);

  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   console.log("data", data);

  const currYear = useMemo(
    () => new Date().getFullYear(),
    [new Date().getFullYear()]
  );

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 4);
  }, []);

  const dict = ["Love", "war", "red", "heart"];

  //   console.log("currYear", currYear);
  //   console.log("randomNumber", randomNumber);
  let sTerm = dict[randomNumber];
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://www.omddbapi.com/?apikey=667984e7&y=${currYear}&s="${sTerm}"&type="movie"&page=${page}`
      )
      .then((response) => {
        console.log("response", response);
        if (response.data?.Response === "False") return setHasMore(false);
        else setHasMore(true);
        setMovies((prevMovies) => [...prevMovies, ...response?.data?.Search]);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError("Something went wrong. Please try again!");
      });
    // setMovies((prevMovies) => [...prevMovies, ...data]);
    // setMovies((prevMovies) => [...data]);
  }, [page]);

  const handleLocalSearch = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredMovies = movies.filter((movie) => {
    const regex = new RegExp(localSearchTerm, "i");
    return regex.test(movie.Title);
  });
  console.log("hasMore", hasMore);
  return (
    <>
      <Navbar setPage={setPage} setMovies={setMovies} page={page} />
      {error ? (
        <Box>{error}</Box>
      ) : (
        <div>
          <Typography>Searching for {sTerm}</Typography>
          <div className="search-container">
            {/* <input
            type="text"
            value={apiSearchTerm}
            onChange={handleApiSearch}
            placeholder="Search OMDb API..."
          /> */}
            <input
              type="text"
              value={localSearchTerm}
              onChange={handleLocalSearch}
              placeholder="Search among fetched results..."
            />
          </div>
          <InfiniteScroll
            dataLength={filteredMovies.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
