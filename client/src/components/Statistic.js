import React, { useState, useEffect } from "react";

import { Container } from "@mui/material";
import {
  TableBody,
  Table,
  TableCell,
  TableRow,
  TableHead,
  Divider,
} from "@mui/material";

function Statistic(props) {
  const [stats, setStats] = useState([]);

  const getStats = async () => {
    await fetch("http://localhost:2000/getLeaderboard/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.sort((a, b) => b.score - a.score);
        for (let i = 0; i < data.length; i++) {
          data[i].rank = i + 1;
        }
        setStats(data);
      });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Container maxWidth="md" className="leaderboard">
      <div className="banner" style={{ backgroundColor: "rgb(227, 70, 14)" }}>
        <h1>Leaderboard</h1>
      </div>
      <Table sx={{ margin: "0px" }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {" "}
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((item, index) => (
            <TableRow
              style={
                index % 2 ? { background: "white" } : { background: "#D3D3D3" }
              }
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {" "}
              <TableCell align="center">{item.rank}</TableCell>
              <TableCell align="center">{item.username}</TableCell>
              <TableCell align="center">{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Statistic;
