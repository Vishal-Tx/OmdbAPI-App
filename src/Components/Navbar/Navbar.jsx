import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = ({ handleLocalSearch, localSearchTerm, setApiSearchTerm }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    let delay = setTimeout(() => {
      setApiSearchTerm(search);
    }, 250);

    return () => clearTimeout(delay);
  }, [search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
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
        value={search}
        onChange={handleChange}
        placeholder="Search OMDb API..."
      />
    </Box>
  );
};

export default Navbar;
