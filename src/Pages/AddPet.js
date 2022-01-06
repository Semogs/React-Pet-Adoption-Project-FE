import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import Nyancat from "../Images/nyancat.gif";
import FormControl from "@mui/material/FormControl";
import AdminNavBar from "../Components/AdminNavBar";

export default function AddPet() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [petTypeInput, setPetTypeInput] = useState("");
  const [petNameInput, setPetNameInput] = useState("");
  const [adoptionStatusInput, setAdoptionStatusInput] = useState("");
  const [petImage, setPetImage] = useState("");
  const [petHeightInput, setPetHeightInput] = useState("");
  const [petWeightInput, setPetWeightInput] = useState("");
  const [petColorInput, setPetColorInput] = useState("");
  const [petBioInput, setPetBioInput] = useState("");
  const [hypoallergenicInput, setHypoallergenicInput] = useState(false);
  const [petBreedInput, setPetBreedInput] = useState("");
  const [petDietaryInput, setPetDietaryInput] = useState("");

  const handlePetImage = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setPetImage({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (petImage) formData.append("image", petImage.image);
    formData.append("type", petTypeInput);
    formData.append("name", petNameInput);
    formData.append("adoptionStatus", adoptionStatusInput);
    formData.append("height", petHeightInput);
    formData.append("weight", petWeightInput);
    formData.append("color", petColorInput);
    formData.append("bio", petBioInput);
    formData.append("hypoallergenic", hypoallergenicInput);
    formData.append("breed", petBreedInput);
    formData.append("dietary", petDietaryInput);

    axios
      .post("http://localhost:4000/add-pet", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "auth-token": `${token}`,
        },
      })
      .then(alert("Pet successfully added"))
      .catch((error) => {
        console.log(error);
        alert("Make sure to fill all the required fields");
      });
    setPetImage("");
    setPetTypeInput("");
    setPetNameInput("");
    setAdoptionStatusInput("");
    setPetHeightInput("");
    setPetWeightInput("");
    setPetColorInput("");
    setPetBioInput("");
    setHypoallergenicInput("");
    setPetBreedInput("");
    setPetDietaryInput("");
  };

  return (
    <>
      <AdminNavBar />
      <img
        src={Nyancat}
        alt=""
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "150%",
          bottom: "-58%",
        }}
      />
      <Paper
        elevation={10}
        sx={{ padding: "1px 20px", pb: 2, width: 500, margin: "75px auto" }}
      >
        <form onSubmit={handleAddPet}>
          <FormControl variant="filled" sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={petTypeInput}
              required
              onChange={(event) => {
                setPetTypeInput(event.target.value);
              }}
            >
              <MenuItem value={"Dog"}>Dog</MenuItem>
              <MenuItem value={"Cat"}>Cat</MenuItem>
            </Select>
            <TextField
              fullWidth
              type="text"
              label="Pet Name"
              value={petNameInput}
              placeholder="Fluffy"
              required
              sx={{ mt: 1 }}
              onChange={(e) => setPetNameInput(e.target.value)}
            />
            <InputLabel id="demo-simple-select-filled-label" sx={{ mt: 16 }}>
              Adoption Status
            </InputLabel>
            <Select
              sx={{ mt: 1 }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              required
              value={adoptionStatusInput}
              onChange={(event) => {
                setAdoptionStatusInput(event.target.value);
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
              onChange={(e) => handlePetImage(e)}
              name="image"
            />
            <TextField
              fullWidth
              type="number"
              value={petHeightInput}
              label="Height"
              required
              placeholder="Enter your number in centimeters"
              sx={{ mt: 1 }}
              onChange={(e) => setPetHeightInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="number"
              value={petWeightInput}
              label="Weight"
              required
              placeholder="Enter your number in kilograms"
              sx={{ mt: 1 }}
              onChange={(e) => setPetWeightInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              value={petColorInput}
              label="Color"
              required
              placeholder="White"
              sx={{ mt: 1 }}
              onChange={(e) => setPetColorInput(e.target.value)}
            />
            <TextareaAutosize
              fullWidth
              aria-label="minimum height"
              minRows={7}
              value={petBioInput}
              placeholder="Please enter the important details about pet"
              style={{ width: 463, marginTop: 9 }}
              onChange={(e) => setPetBioInput(e.target.value)}
            />
            <InputLabel id="demo-simple-select-filled-label" sx={{ mt: 71 }}>
              Hypoallergenic
            </InputLabel>
            <Select
              sx={{ mt: 1 }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              required
              value={hypoallergenicInput}
              onChange={(event) => {
                setHypoallergenicInput(event.target.value);
              }}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
            <TextField
              fullWidth
              type="text"
              value={petBreedInput}
              label="Breed"
              required
              placeholder="Pomeranian"
              sx={{ mt: 1 }}
              onChange={(e) => setPetBreedInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              value={petDietaryInput}
              label="Dietary"
              placeholder="Chocolate"
              sx={{ mt: 1 }}
              onChange={(e) => setPetDietaryInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#581845" }}
            >
              Add Pet
            </Button>
          </FormControl>
        </form>
      </Paper>
    </>
  );
}
