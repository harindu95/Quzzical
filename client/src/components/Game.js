import React from "react";
import { Box, Container, Grid, Button } from "@mui/material";
function Game(props) {
  return (
    <Container className="game">
      <Grid spacing={1} container>
        <Grid item xs={12} md={12}>
          <div className="question">question</div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="primary" className="answer" id="ans1">
            <div>answer 1</div>
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="primary" className="answer" id="ans2">
            <div>answer 1</div>
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="primary" className="answer" id="ans3">
            <div>answer 1</div>
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="primary" className="answer" id="ans4">
            <div>answer 1</div>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
