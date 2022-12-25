import { Box, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Navbar = ({ setApiSearchTerm }) => {
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
        justifyContent: { xs: "center", sm: "space-between" },
        backgroundColor: "#3C2A21",
        color: "white",
        py: 2,
        px: 6,
      }}
    >
      <Link
        href="/"
        sx={{
          textDecoration: "none",
          color: "white",
          marginRight: "15px",
          marginBottom: { xs: "10px", sm: "0" },
        }}
      >
        <Typography variant="h4">Moviezzz</Typography>
      </Link>
      <TextField
        size="small"
        label="Search from OMDb API..."
        variant="filled"
        value={search}
        onChange={handleChange}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "4px",
          "& label.Mui-focused": {
            color: "#3C2A21",
          },
        }}
      />
    </Box>
  );
};

export default Navbar;
