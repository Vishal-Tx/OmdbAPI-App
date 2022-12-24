import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import "./style.css";
import Details from "../Modal/DetailsModal";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imdbID, setImdbID] = useState(null);
  const openModal = () => {
    setOpen(true);
    setIsLoading(true);
    // console.log("movie.imdbID", movie.imdbID);
    setImdbID(movie?.imdbID);
  };
  if (!movie) return <></>;
  return (
    <>
      {open && <Details open={open} setOpen={setOpen} imdbID={imdbID} />}
      <Card
        className="card"
        raised
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          width: "450px",
          height: "100%",
          position: "relative",
          m: 2,
        }}
      >
        <ButtonBase
          onClick={openModal}
          component="span"
          name="test"
          sx={{ display: "inline-block", textAlign: "initial" }}
        >
          <CardMedia
            className="cardMedia"
            sx={{
              component: "div",
              paddingTop: "56.25%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backgroundBlendMode: "darken",
              borderRadius: "15px 15px 0 0",
              width: "100%",
              height: "100%",
            }}
            image={movie?.Poster}
            title={movie?.Title}
            alt="poster"
          />

          <div
            className="cardText"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "white",
            }}
          >
            <Typography variant="h6">{movie?.Title}</Typography>
            <Typography variant="body2" component="h1">
              {movie?.Year}
            </Typography>
          </div>
        </ButtonBase>
      </Card>
    </>
  );
};

export default MovieCard;
