import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import "./TeamsForm.css";

function TeamsForm({ league }) {
  const [season, setSeason] = useState(league.seasons[0]);

  let temprows = [];
  let teams = [];

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function createData(team) {
    let name = team.team.name;
    let wins = team.games.wins.all.total;
    let draws = team.games.draws.all.total;
    let loses = team.games.loses.all.total;
    return { name, wins, draws, loses };
  }

  //loop through all team ids:
  //search team stats with {league} {season} {teamid}, save {teamname, wins, losses, draws} as a row
  function getTeamStats(myteams) {
    for (let i = 0; i < myteams.length; i++) {
      (async () => {
        let teamUrl =
          "https://api-basketball.p.rapidapi.com/statistics?season=" +
          season.season +
          "&league=" +
          league.id +
          "&team=" +
          myteams[i];
        const response = await fetch(teamUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
          },
        });
        const res = await response.json();
        temprows = [...temprows, createData(res.response)];
        if (i === myteams.length - 1) {
          setRows(temprows);
        }
      })();
    }
  }

  function OnSeasonChange(index) {
    setSeason(league.seasons[index]);
  }

  //whenever league changes, reset the season
  useEffect(() => {
    setSeason(league.seasons[0]);
  }, [league]);

  //search teams with {league} and {season}, get ids and save in array 'teams'
  useEffect(() => {
    (async () => {
      let teamsUrl =
        "https://api-basketball.p.rapidapi.com/teams?league=" +
        league.id +
        "&season=" +
        season.season;
      const response = await fetch(teamsUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
          "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        },
      });
      const res = await response.json();
      teams = [...res.response.map((e) => e.id)];
      getTeamStats(teams);
    })();
  }, [league, season]);

  function RenderSeasonButtons() {
    switch (league.seasons.length) {
      case 1:
        return (
          <div>
            <button onClick={() => OnSeasonChange(0)}>
              {" "}
              {league.seasons[0].season}{" "}
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <button onClick={() => OnSeasonChange(0)}>
              {" "}
              {league.seasons[0].season}{" "}
            </button>
            <button onClick={() => OnSeasonChange(1)}>
              {" "}
              {league.seasons[1].season}{" "}
            </button>
          </div>
        );
      default:
        return (
          <div>
            <button onClick={() => OnSeasonChange(0)}>
              {" "}
              {league.seasons[0].season}{" "}
            </button>
            <button onClick={() => OnSeasonChange(1)}>
              {" "}
              {league.seasons[1].season}{" "}
            </button>
            <button onClick={() => OnSeasonChange(2)}>
              {" "}
              {league.seasons[2].season}{" "}
            </button>
          </div>
        );
    }
  }

  return (
    <div className="main">
      <h2>last three seasons: </h2>
      {RenderSeasonButtons()}
      <h2>Country: {league.country.name}</h2>
      <h2>League: {league.name}</h2>
      <h2>Season: {season.season} (from {season.start} to {season.end})</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Wins</TableCell>
              <TableCell align="right">Loses</TableCell>
              <TableCell align="right">Draws</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.wins}</TableCell>
                  <TableCell align="right">{row.loses}</TableCell>
                  <TableCell align="right">{row.draws}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

export default TeamsForm;