import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "50px",
        textAlign: "center",
      }}
    >
      <CircularProgress sixe={100} />
    </Box>
  );
};

export default Loader;
