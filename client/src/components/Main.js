import React, { useEffect, useState } from "react";
import Game from "./Game";
import Statistic from "./Statistic";
import ChatBox from "./ChatBox";
import {
  Tab,
  Tabs,
  Typography,
  Box,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import "./style.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Main = (props) => {
  const [value, setValue] = useState(0);
  const color =
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="banner" style={{ backgroundColor: "rgb(127, 83, 180)" }}>
        <h1>Quizzicle</h1>
      </div>
      <div className="mainContainer">
        <Grid container item justify="center" md={12}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              style={{ fontSize: 14, color: "black" }}
              label="Play"
              {...a11yProps(0)}
            />
            <Tab
              style={{ fontSize: 14, color: "black" }}
              label="Statistics"
              {...a11yProps(1)}
            />
            <Tab
              style={{ fontSize: 14, color: "black" }}
              label="Chat"
              {...a11yProps(2)}
            />
          </Tabs>
          <Grid item xs={12}>
            <Divider />
            <TabPanel value={value} index={0}>
              <Grid item xs={12}>
                <Game username={props.username} />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Statistic />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ChatBox nickname={props.username} color={color} />
            </TabPanel>
          </Grid>
        </Grid>
        <Divider />
      </div>
    </>
  );
};

export default Main;
