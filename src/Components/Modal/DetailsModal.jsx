import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import data from "../../assets/modal.json";
import { Card, CardMedia } from "@mui/material";
import { GiDirectorChair, GiNuclearPlant } from "react-icons/Gi";
import { TbLanguage } from "react-icons/Tb";
import { FaPenNib } from "react-icons/Fa";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/Ai";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", lg: "auto" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#D0B8A8",
};

export default function Details({ open, setOpen, imdbID }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://www.omdbapi.com/?apikey=667984e7&i=${imdbID}`)
      .then((response) => {
        console.log("modal", response.data);
        setDetails(response.data);
        setIsLoading(false);

        setIsLoading(false);
        console.log("details", details);
      })
      .catch((error) => {
        console.error("error", error);
        setIsLoading(false);
        setError("Something went wrong. Please Try Again!");
      });
    // setDetails(data);
    // setIsLoading(false);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Box
            mt={-2}
            mb={1}
            mr={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <AiFillCloseCircle
              size="25px"
              className="closemodal"
              onClick={handleClose}
            />
          </Box>
          {isLoading ? (
            "Loading..."
          ) : !!error ? (
            { error }
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap-reverse",
                }}
              >
                <Box sx={{ mx: { xs: "auto", lg: "0" } }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    m={1}
                    sx={{ fontWeight: 600 }}
                  >
                    {details?.Title}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    m={1}
                    sx={{
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <GiDirectorChair size="2rem" />
                    {details?.Director}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Typography id="modal-modal-title" variant="body1" m={1}>
                      {details?.Released}
                    </Typography>
                    <Typography id="modal-modal-title" variant="body1" m={1}>
                      {details?.Runtime}
                    </Typography>
                    <Typography id="modal-modal-title" variant="body1" m={1}>
                      {details?.Genre.replace(/,/g, " |")}
                    </Typography>
                  </Box>
                  <Typography
                    id="modal-modal-title"
                    variant="body1"
                    m={1}
                    mb={2}
                    sx={{}}
                  >
                    <i>{details?.Actors}</i>
                  </Typography>

                  <Typography
                    id="modal-modal-title"
                    variant="body1"
                    m={1}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FaPenNib size="20px" style={{ marginRight: "10px" }} />{" "}
                    {details?.Writer}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="body1"
                    m={1}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <TbLanguage size="2rem" /> {details?.Language}
                  </Typography>
                </Box>
                <CardMedia
                  sx={{
                    backgroundSize: "contain",
                    width: { xs: "70%", sm: "40%", lg: "30%" },
                    borderRadius: "15px",
                    mx: { xs: "auto", lg: "0" },
                  }}
                  component="img"
                  image={details?.Poster}
                  alt={details?.Title}
                />
              </Box>
              <Box>
                <Typography id="modal-modal-title" variant="body1" m={1}>
                  Summary: {details?.Plot}
                </Typography>
              </Box>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              ></Typography>
            </>
          )}
        </Card>
      </Modal>
    </div>
  );
}
