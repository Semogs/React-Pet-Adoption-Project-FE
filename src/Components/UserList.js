import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdoptContext } from "../Context/Context";

export default function UserList() {
  const { usersList } = useContext(AdoptContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, mt: 10, ml: 25 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Bio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={"/user/" + user._id}>{user._id}</Link>
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.firstName}</TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">{user.phoneNumber}</TableCell>
              <TableCell align="left">{user.bio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
