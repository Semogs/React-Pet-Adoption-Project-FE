import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import AdminNavBar from "../Components/AdminNavBar";
import Pet from "../Components/Pet";
import { Grid } from "@mui/material";
import Background from "../Images/editpetbackground.gif";

export default function EditPet(props) {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const [updatePetType, setUpdatePetType] = useState("");
  const [updatePetName, setUpdatePetName] = useState("");
  const [updateAdoptionStatus, setUpdateAdoptionStatus] = useState("");
  const [updatePetImage, setUpdatePetImage] = useState("");
  const [updatePetHeight, setUpdatePetHeight] = useState("");
  const [updatePetWeight, setUpdatePetWeight] = useState("");
  const [updatePetColor, setUpdatePetColor] = useState("");
  const [updatePetBio, setUpdatePetBio] = useState("");
  const [updateHypoallergenic, setUpdateHypoallergenic] = useState(false);
  const [updateBreed, setUpdateBreed] = useState("");
  const [updateDietary, setUpdateDietary] = useState("");
  const [selectedPet, setSelectedPet] = useState();

  useEffect(() => {
    const headerConfig = {
      "auth-token": `${token}`,
    };
    axios
      .get(`http://localhost:4000/pet/${id}`, { headers: headerConfig })
      .then((res) => {
        setSelectedPet(res.data);
      });
  }, [selectedPet]);

  const handleUpdatePetImage = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setUpdatePetImage({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleEditPet = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", updatePetImage.imagePreviewUrl);
    formData.append("type", updatePetType);
    formData.append("name", updatePetName);
    formData.append("adoptionStatus", updateAdoptionStatus);
    formData.append("height", updatePetHeight);
    formData.append("weight", updatePetWeight);
    formData.append("color", updatePetColor);
    formData.append("bio", updatePetBio);
    formData.append("hypoallergenic", updateHypoallergenic);
    formData.append("breed", updateBreed);
    formData.append("dietary", updateDietary);

    axios
      .put(`http://localhost:4000/pet/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "auth-token": `${token}`,
        },
      })
      .then(alert("Pet successfully updated"))
      .catch((error) => {
        console.log(error);
      });
    setUpdatePetImage("");
    setUpdatePetType("");
    setUpdatePetName("");
    setUpdateAdoptionStatus("");
    setUpdatePetHeight("");
    setUpdatePetWeight("");
    setUpdatePetColor("");
    setUpdatePetBio("");
    setUpdateHypoallergenic("");
    setUpdateBreed("");
    setUpdateDietary("");
  };

  return (
    <>
      <AdminNavBar />
      <img
        src={Background}
        alt=""
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "155%",
          bottom: "-62%",
        }}
      />
      <Grid sx={{ display: "flex" }}>
        <Paper
          elevation={0}
          sx={{
            padding: "15px 20px",
            width: 450,
            margin: "80px auto",
            height: "0px",
            backgroundColor: "transparent",
          }}
        >
          <Pet pet={selectedPet ? selectedPet : props} />
        </Paper>
        <Paper
          elevation={10}
          sx={{ padding: "15px 20px", width: 500, margin: "80px auto" }}
        >
          <form onSubmit={handleEditPet}>
            <FormControl variant="filled" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={updatePetType}
                onChange={(event) => {
                  setUpdatePetType(event.target.value);
                }}
              >
                <MenuItem value={"Dog"}>Dog</MenuItem>
                <MenuItem value={"Cat"}>Cat</MenuItem>
              </Select>
              <TextField
                fullWidth
                type="text"
                label="Pet Name"
                value={updatePetName}
                placeholder={selectedPet ? selectedPet.name : null}
                sx={{ mt: 1 }}
                onChange={(e) => setUpdatePetName(e.target.value)}
              />
              <InputLabel id="demo-simple-select-filled-label" sx={{ mt: 16 }}>
                Adoption Status
              </InputLabel>
              <Select
                sx={{ mt: 1 }}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={updateAdoptionStatus}
                onChange={(event) => {
                  setUpdateAdoptionStatus(event.target.value);
                }}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Fostered"}>Fostered</MenuItem>
                <MenuItem value={"Adopted"}>Adopted</MenuItem>
              </Select>
              <TextField
                fullWidth
                type="file"
                sx={{ mt: 1 }}
                onChange={(e) => handleUpdatePetImage(e)}
                name="image"
              />
              <TextField
                fullWidth
                type="number"
                value={updatePetHeight}
                label="Height"
                placeholder={selectedPet ? selectedPet.height : null}
                sx={{ mt: 1 }}
                onChange={(e) => setUpdatePetHeight(e.target.value)}
              />
              <TextField
                fullWidth
                type="number"
                value={updatePetWeight}
                label="Weight"
                placeholder={selectedPet ? selectedPet.weight : null}
                sx={{ mt: 1 }}
                onChange={(e) => setUpdatePetWeight(e.target.value)}
              />
              <TextField
                fullWidth
                type="text"
                value={updatePetColor}
                label="Color"
                placeholder={selectedPet ? selectedPet.color : null}
                sx={{ mt: 1 }}
                onChange={(e) => setUpdatePetColor(e.target.value)}
              />
              <TextareaAutosize
                fullWidth
                aria-label="minimum height"
                minRows={7}
                value={updatePetBio}
                placeholder={selectedPet ? selectedPet.bio : null}
                style={{ width: 463, marginTop: 9 }}
                onChange={(e) => setUpdatePetBio(e.target.value)}
              />
              <InputLabel id="demo-simple-select-filled-label" sx={{ mt: 71 }}>
                Hypoallergenic
              </InputLabel>
              <Select
                sx={{ mt: 1 }}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={updateHypoallergenic}
                onChange={(event) => {
                  setUpdateHypoallergenic(event.target.value);
                }}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
              <TextField
                fullWidth
                type="text"
                value={updateBreed}
                label="Breed"
                placeholder={selectedPet ? selectedPet.breed : null}
                sx={{ mt: 1 }}
                onChange={(e) => setUpdateBreed(e.target.value)}
              />
              <TextField
                fullWidth
                type="text"
                value={updateDietary}
                label="Dietary"
                placeholder={selectedPet ? selectedPet.dietary : null}
                sx={{ mt: 1 }}
                onChange={(e) => setUpdateDietary(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#581845" }}
              >
                Update Pet
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </>
  );
}
