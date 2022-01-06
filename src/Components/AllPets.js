import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { AdoptContext } from "../Context/Context";

export default function AllPets() {
  const { petsList } = useContext(AdoptContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450, mt: 10, ml: 25 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Adoption Status</TableCell>
            <TableCell align="left">Height</TableCell>
            <TableCell align="left">Weight</TableCell>
            <TableCell align="left">Color</TableCell>
            <TableCell align="left">Breed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {petsList.map((pet) => (
            <TableRow
              key={pet.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={"/edit-pet/" + pet._id}>{pet._id}</Link>
              </TableCell>

              <TableCell align="left">{pet.type}</TableCell>
              <TableCell align="left">{pet.name}</TableCell>
              <TableCell align="left">{pet.adoptionStatus}</TableCell>
              <TableCell align="left">{pet.height}</TableCell>
              <TableCell align="left">{pet.weight}</TableCell>
              <TableCell align="left">{pet.color}</TableCell>
              <TableCell align="left">{pet.breed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
