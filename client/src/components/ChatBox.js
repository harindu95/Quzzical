import React, { useEffect, useState } from "react";
import { Box, Container, Grid, TextField } from "@mui/material";

function ChatBox(props) {
  const [currentText, setCurrentText] = useState("");

  const handleTextField = (e) => {
    setCurrentText(e.target.value);
  };

  const handleKeypress = (e) => {
    const re = new RegExp("^(/(nick) (<.+>))$");
    const re2 = new RegExp("^(/(nickcolor) (<.+>))$");

    if (e.charCode === 13) {
      const message = currentText;
      if (message === "") {
        return;

        e.preventDefault();
        setCurrentText("");
      }
    }
  };

  return (
    <>
      <Container className="chat">
        <Grid container justify="center">
          <Grid item>
            <h1>hello</h1>
          </Grid>
        </Grid>
      </Container>
      <TextField
        value={currentText}
        onKeyPress={(e) => handleKeypress(e)}
        onChange={(e) => handleTextField(e)}
        placeholder="Enter Message"
        fullWidth
      />
    </>
  );
}

export default ChatBox;
