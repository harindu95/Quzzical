import React from "react";

const Scoreboard = (props) => {
  const score = props.score;

  return <h1>{score}</h1>;
};

export default Scoreboard;
