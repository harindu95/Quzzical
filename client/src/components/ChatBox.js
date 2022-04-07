import React, { useEffect, useState } from "react";
import { Box, Container, Grid, TextField } from "@mui/material";
import io from "socket.io-client";

const socket = io("localhost:4000", { transports: ["websocket"] });

function ChatBox(props) {
  const [color, setColor] = useState(props.color);
  const [nickname, setnickname] = useState(props.nickname);
  const [currentText, setCurrentText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("chat reload");
    if (!loaded) {
      const emptyString = undefined;
      socket.emit("message", { user: { nickname, color }, emptyString });
      socket.on("message", (messages) => {
        setMessages(messages);
      });
      console.log(nickname);
      setLoaded(true);
    }
  }, [messages]);
  const handleTextField = (e) => {
    setCurrentText(e.target.value);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      const message = currentText;
      if (message.trim() === "") {
        return;
      }
      socket.emit("message", { user: { nickname, color }, message });
      e.preventDefault();
      setCurrentText("");
    }
  };

  if (!true) {
    return <h1>connection failed try again...</h1>;
  } else {
    return (
      <>
        <div
          className="banner"
          style={{ backgroundColor: "rgb(100, 185, 74)" }}
        >
          <h1>Chat Room</h1>
        </div>
        <Box sx={{ flexGrow: 1 }} className="container">
          <Grid container className="window">
            <Grid item container spacing={3} className="content">
              <Grid item xs={12} md={12} lg={12} className="chatWindow">
                <div className="chatBox">
                  {messages.map((message) => {
                    return (
                      <span
                        key={message}
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <p>
                          {" "}
                          {message.timeStamp}{" "}
                          <span style={{ color: message.user.color }}>
                            {" "}
                            {message.user.nickname}{" "}
                          </span>
                          :
                        </p>
                        <p>&ensp;{message.message}</p>
                      </span>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
            <Grid item container className="textField">
              <Grid item xs={12} md={12} lg={12} className="textField">
                <TextField
                  value={currentText}
                  onKeyPress={(e) => handleKeypress(e)}
                  onChange={(e) => handleTextField(e)}
                  placeholder="Enter Message"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default ChatBox;
