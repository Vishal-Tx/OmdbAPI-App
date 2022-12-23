import { Box, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#3C2A21", color: "white" }}>
      <Typography variant="h4">Moviezzz</Typography>
      <input type="text" placeholder="Search OMDb API..." />
    </Box>
  );
};

export default Navbar;
