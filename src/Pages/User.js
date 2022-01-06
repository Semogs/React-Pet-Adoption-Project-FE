import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pet from "../Components/Pet";
import { Paper } from "@mui/material";
import AdminNavBar from "../Components/AdminNavBar";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function User() {
  const { id } = useParams();
  const [cardExpanded, setCardExpanded] = useState(false);
  const [petToggle, setPetToggle] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const headerConfig = {
      "auth-token": `${token}`,
    };
    axios
      .get(`http://localhost:4000/user/${id}`, { headers: headerConfig })
      .then((res) => {
        setSelectedUser(res.data);
      });
  }, []);
  return (
    <>
      <AdminNavBar />
      <Card
        sx={{
          maxWidth: 550,
          textAlign: "center",
          padding: "30px 20px",
          margin: "80px auto",
          backgroundColor: "#581845",
          color: "white",
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image={selectedUser ? selectedUser.avatar : null}
          alt=""
        />
        <CardContent
          sx={{
            textAlign: "start",
          }}
        >
          <Typography variant="h6">
            First Name: {selectedUser ? selectedUser.firstName : null}
          </Typography>
          <Typography variant="h6">
            Last Name: {selectedUser ? selectedUser.lastName : null}
          </Typography>
          <Typography variant="h6">
            Email: {selectedUser ? selectedUser.email : null}
          </Typography>
          <Typography variant="h6">
            Phone Number: {selectedUser ? selectedUser.phoneNumber : null}
          </Typography>
          <Typography variant="h6">
            Bio: {selectedUser ? selectedUser.bio : null}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={cardExpanded}
            onClick={() => {
              setCardExpanded(!cardExpanded);
            }}
            aria-expanded={cardExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={cardExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            {petToggle ? (
              <Paper sx={{ pb: 2 }}>
                <FormControlLabel
                  value="start"
                  control={
                    <Checkbox
                      checked={petToggle}
                      onChange={(event) => {
                        setPetToggle(event.target.checked);
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
                  label="Saved Pets"
                  labelPlacement="start"
                />
                <h2>Adopted/Fostered Pets</h2>

                {selectedUser ? (
                  selectedUser.pets.map((pet) => <Pet pet={pet} />)
                ) : (
                  <h3>User currently do not own or foster any pets</h3>
                )}
              </Paper>
            ) : (
              <Paper sx={{ pb: 2 }}>
                <FormControlLabel
                  value="start"
                  control={
                    <Checkbox
                      checked={petToggle}
                      onChange={(event) => {
                        setPetToggle(event.target.checked);
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
                  label="Adopted/Fostered Pets"
                  labelPlacement="start"
                />
                <h2>Saved Pets</h2>
                {selectedUser ? (
                  selectedUser.favorite.map((pet) => <Pet pet={pet} />)
                ) : (
                  <h3>User currently do not have any favorite pets</h3>
                )}
              </Paper>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
