import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdoptContext } from "../Context/Context";
import axios from "axios";

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

export default function Pet(props) {
  const token = JSON.parse(localStorage.getItem("token"));
  const { pet } = props;
  const { currentUser } = useContext(AdoptContext);
  const favoritePets = currentUser.favorite;
  const userPets = currentUser.pets;
  const petId = pet._id;
  const foundFavoritePets = favoritePets.find((pet) => pet._id === petId);
  const foundPets = userPets.find((pet) => pet._id === petId);

  const [cardExpanded, setCardExpanded] = useState(false);
  const [adoptionStatus, setAdoptionStatus] = useState(pet.adoptionStatus);
  const [savePet, setSavePet] = useState(foundFavoritePets);

  const headerConfig = {
    "auth-token": `${token}`,
  };

  const handleAdopt = (e) => {
    setAdoptionStatus("Adopted");
    pet.adoptionStatus = "Adopted";
    const userPets = currentUser.pets;
    const isPetExist = userPets.filter((userPet) => {
      if (pet._id === userPet._id) {
        userPet.adoptionStatus = "Adopted";
        return true;
      }
      return false;
    });
    if (isPetExist.length !== 0) {
      return;
    }

    axios
      .put(
        "http://localhost:4000/status/adopt-foster",
        { id: pet._id, adoptionStatus: "Adopted", pet: pet },
        { headers: headerConfig }
      )
      .catch((err) => {
        console.log(err);
      });
    currentUser.pets.push(pet);
  };

  const handleFoster = (e) => {
    setAdoptionStatus("Fostered");
    pet.adoptionStatus = "Fostered";
    const userPets = currentUser.pets;

    const isPetExist = userPets.filter((userPet) => {
      if (pet._id === userPet._id) {
        userPet.adoptionStatus = "Fostered";
        return true;
      }
      return false;
    });

    if (isPetExist.length !== 0) {
      return;
    }
    axios
      .put(
        "http://localhost:4000/status/adopt-foster",
        { id: pet._id, adoptionStatus: "Fostered", pet: pet },
        { headers: headerConfig }
      )
      .catch((err) => {
        console.log(err);
      });
    currentUser.pets.push(pet);
  };

  const handleReturn = (e) => {
    setAdoptionStatus("Available");
    pet.adoptionStatus = "Available";
    const userPets = currentUser.pets;
    const luckyPets = userPets.filter((userPet) => {
      if (pet._id === userPet._id) {
        return false;
      }
      return true;
    });
    currentUser.pets = luckyPets;

    axios
      .put(
        "http://localhost:4000/status/set-pets",
        { pets: luckyPets },
        { headers: headerConfig }
      )
      .catch((err) => {
        console.log(err);
      });
    axios
      .put(
        "http://localhost:4000/status/available-pet",
        { id: pet._id, adoptionStatus: "Available" },
        { headers: headerConfig }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFavorite = (e) => {
    setSavePet(!savePet);
    axios
      .put(
        "http://localhost:4000/status/save",
        { id: pet._id, isFavorite: !savePet, pet: pet },
        { headers: headerConfig }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          textAlign: "center",
          mt: 2,
          padding: "30px 20px",
          margin: "20px auto",
          backgroundColor: "#581845",
          color: "white",
        }}
      >
        <CardHeader title={pet ? pet.name : "Fluffy"} />
        <CardMedia
          component="img"
          height="194"
          image={pet ? pet.image : null}
          alt=""
        />
        <CardContent
          sx={{
            textAlign: "start",
          }}
        >
          <Typography variant="body2">
            Type: {pet ? pet.type : "Dog"}
          </Typography>
          <Typography variant="body2">
            Adoption Status: {pet.adoptionStatus}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {currentUser.Admin === "false" ? (
            <>
              {pet.adoptionStatus === "Adopted" ||
              pet.adoptionStatus === "Fostered" ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled
                  sx={{
                    mr: 0.5,
                    backgroundColor: "black",
                  }}
                >
                  Adopt
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mr: 0.5,
                    backgroundColor: "black",
                  }}
                  onClick={handleAdopt}
                >
                  Adopt
                </Button>
              )}
              {pet.adoptionStatus === "Fostered" ||
              pet.adoptionStatus === "Adopted" ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled
                  sx={{ mr: 0.5, backgroundColor: "black" }}
                >
                  Foster
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mr: 0.5, backgroundColor: "black" }}
                  onClick={handleFoster}
                >
                  Foster
                </Button>
              )}

              {pet.adoptionStatus === "Available" ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled
                  sx={{ backgroundColor: "black" }}
                >
                  Return
                </Button>
              ) : foundPets ? (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                  onClick={handleReturn}
                >
                  Return
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                  disabled
                >
                  Return
                </Button>
              )}

              <IconButton
                aria-label="add to favorites"
                onClick={handleFavorite}
              >
                <FavoriteIcon
                  sx={{
                    color: savePet ? "white" : "black",
                  }}
                />
              </IconButton>
            </>
          ) : null}

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
          <CardContent
            sx={{
              textAlign: "start",
            }}
          >
            <Typography paragraph>{pet ? pet.weight : "None"} kg</Typography>
            <Typography paragraph>{pet ? pet.height : "None"} cm</Typography>
            <Typography paragraph>
              Hypoallergenic:{pet ? pet.hypoallergenic : "Yes"}
            </Typography>
            <Typography paragraph>
              Dietary Restrictions: {pet ? pet.dietary : "Chocolate"}
            </Typography>
            <Typography paragraph>
              Color: {pet ? pet.color : "White"}
            </Typography>
            <Typography paragraph>
              Breed: {pet ? pet.breed : "Pomeranian"}
            </Typography>
            <Typography paragraph>
              Bio: {pet ? pet.bio : "Cute Doggo"}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
