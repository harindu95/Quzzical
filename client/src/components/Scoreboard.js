import React from "react";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Scoreboard = (props) => {
  const score = props.score;

  return (
    <Box sx={{ ...style }}>
      <h3> Your score is: {parseInt(score) + 10}</h3>
    </Box>
  );
};

export default Scoreboard;
