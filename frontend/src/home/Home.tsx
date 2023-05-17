import React from "react";
import { Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <header>
      <Typography variant="h4">Nasz Serwis</Typography>
      <Button variant="contained" color="primary">
        Zaloguj
      </Button>
    </header>
  );
};

export default Home;
