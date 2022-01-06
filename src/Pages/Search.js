import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CatOrDog from "../Images/catordog.gif";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LoggedInNavBar from "../Components/LoggedInNavBar";
import Pet from "../Components/Pet";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function Search() {
  const token = JSON.parse(localStorage.getItem("token"));

  const [searchedPetList, setSearchedPetList] = useState([]);
  const [searchPetType, setSearchPetType] = useState("");
  const [searchAdoptionStatus, setSearchAdoptionStatus] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchPetName, setSearchPetName] = useState("");
  const [searchHeight, setSearchHeight] = useState("");
  const [searchWeight, setSearchWeight] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);

  const handleSearch = (e) => {
    setSearchLoader(true);
    e.preventDefault();
    const searchResults = {
      searchPetType: searchPetType,
      searchPetName: searchPetName,
      searchAdoptionStatus: searchAdoptionStatus,
      searchHeight: searchHeight,
      searchWeight: searchWeight,
    };
    const headerConfig = {
      "auth-token": `${token}`,
    };
    axios
      .post("http://localhost:4000/search", searchResults, {
        headers: headerConfig,
      })
      .then((res) => {
        setSearchedPetList(res.data);
        setSearchLoader(false);
      });
  };
  let counter = 0;

  return (
    <div>
      <LoggedInNavBar />
      <img
        src={CatOrDog}
        alt=""
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          bottom: "-45%",
        }}
      />
      {advancedSearch ? (
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
            }}
          >
            Search for a friend for life!
          </Typography>
          <form onSubmit={handleSearch}>
            <FormControl variant="filled" sx={{ mt: 2, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={searchPetType}
                onChange={(event) => {
                  setSearchPetType(event.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Dog"}>Dog</MenuItem>
                <MenuItem value={"Cat"}>Cat</MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-filled-label" sx={{ mt: 9 }}>
                Adoption Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                sx={{ mt: 2 }}
                value={searchAdoptionStatus}
                onChange={(event) => {
                  setSearchAdoptionStatus(event.target.value);
                }}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Adopted"}>Adopted</MenuItem>
                <MenuItem value={"Fostered"}>Fostered</MenuItem>
              </Select>
              <TextField
                fullWidth
                type="text"
                value={searchPetName}
                label="Pet Name"
                placeholder="Fluffy"
                sx={{ mt: 2 }}
                onChange={(e) => setSearchPetName(e.target.value)}
              />
              <Grid>
                <TextField
                  type="number"
                  value={searchHeight}
                  label="Height"
                  placeholder="0 cm"
                  sx={{ mt: 2, width: 150, mr: 1 }}
                  onChange={(e) => setSearchHeight(e.target.value)}
                />
                <TextField
                  type="number"
                  value={searchWeight}
                  label="Weight"
                  placeholder="0 kg"
                  sx={{ mt: 2, width: 150 }}
                  onChange={(e) => setSearchWeight(e.target.value)}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#581845", margin: "8px 0" }}
              >
                Search
              </Button>
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    checked={advancedSearch}
                    onChange={(event) => {
                      setAdvancedSearch(event.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      color: "#581845",
                      "&.Mui-checked": {
                        color: "#581845",
                      },
                    }}
                  />
                }
                label="Basic Search"
                labelPlacement="start"
              />
            </FormControl>
          </form>
          {searchLoader ? (
            <CircularProgress sx={{ color: "#581845" }} />
          ) : (
            <CircularProgress sx={{ color: "#581845", display: "none" }} />
          )}
          {searchedPetList.map((pet) => (
            <Pet key={"a" + counter++} pet={pet} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
            }}
          >
            Search for a friend for life!
          </Typography>
          <form onSubmit={handleSearch}>
            <FormControl variant="filled" sx={{ mt: 2, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={searchPetType}
                onChange={(event) => {
                  setSearchPetType(event.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Dog"}>Dog</MenuItem>
                <MenuItem value={"Cat"}>Cat</MenuItem>
              </Select>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#581845", margin: "8px 0" }}
              >
                Search
              </Button>
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    checked={advancedSearch}
                    onChange={(event) => {
                      setAdvancedSearch(event.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      color: "#581845",
                      "&.Mui-checked": {
                        color: "#581845",
                      },
                    }}
                  />
                }
                label="Advanced Search"
                labelPlacement="start"
              />
            </FormControl>
          </form>
          {searchLoader ? (
            <CircularProgress sx={{ color: "#581845" }} />
          ) : (
            <CircularProgress sx={{ color: "#581845", display: "none" }} />
          )}
          {searchedPetList.map((pet) => (
            <Pet key={"a" + counter++} pet={pet} />
          ))}
        </Box>
      )}
    </div>
  );
}
