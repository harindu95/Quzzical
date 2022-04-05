import React, { useState, useEffect } from "react";

import { Container } from "@mui/material";
import {
  TableBody,
  Table,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

function Statistic(props) {
  const [stats, setStats] = useState([]);

  const getStats = async () => {
    await fetch("http://localhost:3000/getLeaderboard/")
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
    <Container maxWidth="md" className="stats">
      <h1>Leaderboard</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {" "}
            <TableCell align="left">Rank</TableCell>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Score</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {stats.map((item) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {" "}
              <TableCell align="left">{item.rank}</TableCell>
              <TableCell align="left">{item.username}</TableCell>
              <TableCell align="left">{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Statistic;
