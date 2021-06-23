import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';



function App() {

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [allleagues, setAlleagues] = useState([]);
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ]
  
  
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs};
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt1', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich1', 237, 9.0, 37, 4.3),
    createData('Eclair1', 262, 16.0, 24, 6.0),
    createData('Cupcake1', 305, 3.7, 67, 4.3),
    createData('Gingerbread1', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt2', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich2', 237, 9.0, 37, 4.3),
    createData('Eclair2', 262, 16.0, 24, 6.0),
  
  ];




    /*useEffect(() => {
    fetch("https://api-basketball.p.rapidapi.com/countries", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
        "x-rapidapi-host": "api-basketball.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      countries = countries.concat(data);})
    .catch(err => {
      console.error(err);
    })}, [])*/
  
  useEffect(() => {
      (async () => {
        const response = await fetch("https://api-basketball.p.rapidapi.com/countries", {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
            "x-rapidapi-host": "api-basketball.p.rapidapi.com"
          }
        });
        const res = await response.json();
        setCountries(res.response);
      })();
    }, []
  );

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api-basketball.p.rapidapi.com/leagues", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
          "x-rapidapi-host": "api-basketball.p.rapidapi.com"
        }
      });
      const res = await response.json();
      setAlleagues(res.response);
    })();
  }, []
);

  function onCountryChange(e) {
    console.log(e.target.innerText);
    let leagueUrl = "https://api-basketball.p.rapidapi.com/leagues?country=" + e.target.innerText.toLowerCase();
    fetch(leagueUrl, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
        "x-rapidapi-host": "api-basketball.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
      setLeagues(data.response)
    })
    .catch(err => {
      console.error(err);
    });
  }

  function onLeagueChange(e){
    console.log(e.target.innerText);
  }

  return  <div id="app">
              <div id="mySidebar" class="sidebar">                            
                <a>Country<br/></a>
                <Autocomplete
                  id="countrySelect"
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, padding:30}}
                  renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
                  onChange={onCountryChange}
                />
                <a>League<br/></a>
                <Autocomplete
                  id="leagueSelect"
                  options={leagues}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, padding:30}}
                  renderInput={(params) => <TextField {...params} label="League" variant="outlined" />}
                  onChange={onLeagueChange}
                />
                <a>Search All Leagues</a>
                <Autocomplete
                  id="leagueSelect"
                  options={allleagues}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, padding:30}}
                  renderInput={(params) => <TextField {...params} label="League" variant="outlined" />}
                  onChange={onLeagueChange}
                />
              </div>

              <div class="main">
                <button>season1xx</button><button>season2xx</button><button>season3xx</button>
                <h2>Season xx</h2>
                
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Team</TableCell>
                          <TableCell align="right">Wins</TableCell>
                          <TableCell align="right">Losses</TableCell>
                          <TableCell align="right">Draws</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row.name}>
                            <TableCell>
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
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
              
            </div>
            ;
}

export default App;
