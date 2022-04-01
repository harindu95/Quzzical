import React, { useEffect, useState } from "react";
import Game from "./Game";
import Statistic from "./Statistic";
import ChatBox from "./ChatBox";
import { Tab, Tabs, Typography, Box, Container, Grid } from "@mui/material";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <h1>Quizzicle</h1>
      <Grid container>
        <Grid container item justify="center" md={12}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab style={{ fontSize: 14 }} label="Play" {...a11yProps(0)} />
            <Tab
              style={{ fontSize: 14 }}
              label="Statistics"
              {...a11yProps(1)}
            />
          </Tabs>
        </Grid>

        <Grid item md={12}>
          <TabPanel value={value} index={0}>
            <Grid item md={12}>
              <Game />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Statistic />
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
