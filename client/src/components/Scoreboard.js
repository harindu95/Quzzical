import React from "react";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(127, 83, 180)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Scoreboard = (props) => {
  const score = props.score;

  return (
    <Box
      sx={{ ...style }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Nice job!</h2>
      <h3> Your score is: {score}</h3>
    </Box>
  );
};

export default Scoreboard;
