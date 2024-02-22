import { Box } from "@mui/material";
import React from "react";
import { SearchApp } from "./SearchApp";

export const DrawerSearcMob = () => {
  return (
    <Box
      width="100%"
      display={{ xs: "flex", md: "none" }}
      justifyContent="center"
      padding={1}
    >
      <SearchApp />
    </Box>
  );
};
