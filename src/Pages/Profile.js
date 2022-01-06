import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { AdoptContext } from "../Context/Context";
import LoggedInNavBar from "../Components/LoggedInNavBar";
import SaveIcon from "@mui/icons-material/Save";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import Pet from "../Components/Pet";
import ProfileBackground from "../Images/profilebackground.gif";

export default function Profile() {
  const token = JSON.parse(localStorage.getItem("token"));
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    firstNameInput,
    setFirstNameInput,
    lastNameInput,
    setLastNameInput,
    phoneNumberInput,
    setPhoneNumberInput,
    profilePicture,
    setProfilePicture,
    currentUser,
  } = useContext(AdoptContext);

  const [bioInput, setBioInput] = useState("");
  const [savedStatusToggle, setSavedStatusToggle] = useState(false);

  const profileStyle = {
    padding: "30px 20px",
    width: 470,
    height: 650,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#581845", width: 100, height: 100 };

  const handleProfileImage = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setProfilePicture({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePicture) formData.append("avatar", profilePicture.image);
    if (emailInput) formData.append("email", emailInput);
    if (passwordInput) formData.append("password", passwordInput);
    if (firstNameInput) formData.append("firstName", firstNameInput);
    if (lastNameInput) formData.append("lastName", lastNameInput);
    if (phoneNumberInput) formData.append("phoneNumber", phoneNumberInput);
    if (bioInput) formData.append("bio", bioInput);

    axios
      .put("http://localhost:4000/profile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "auth-token": `${token}`,
        },
      })
      .then(alert("Profile information changed successfully"))
      .catch((error) => {
        console.log(error);
        alert("One of the field information you entered is not correct");
      });

    setEmailInput("");
    setPasswordInput("");
    setFirstNameInput("");
    setLastNameInput("");
    setPhoneNumberInput("");
    setProfilePicture("");
    setBioInput("");
  };

  return (
    <>
      <LoggedInNavBar />
      <img
        src={ProfileBackground}
        alt=""
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "155%",
          bottom: "-220%",
        }}
      />
      <img
        src={ProfileBackground}
        alt=""
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "155%",
          top: "10%",
        }}
      />
      <Grid sx={{ display: "flex" }}>
        <Paper elevation={10} style={profileStyle}>
          <Grid align="center">
            <Avatar
              style={avatarStyle}
              src={currentUser ? currentUser.avatar : null}
            />
          </Grid>
          <form onSubmit={handleUpdateProfile}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={emailInput}
              placeholder={
                currentUser ? currentUser.email : "JohnDoe@somemail.com"
              }
              sx={{ mt: 2 }}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={passwordInput}
              placeholder="Your password must be at least 6 digits"
              sx={{ mt: 1 }}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              value={firstNameInput}
              label="First Name"
              placeholder={currentUser ? currentUser.firstName : "John"}
              sx={{ mt: 1 }}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              value={lastNameInput}
              placeholder={currentUser ? currentUser.lastName : "Doe"}
              sx={{ mt: 1 }}
              onChange={(e) => setLastNameInput(e.target.value)}
            />
            <TextField
              fullWidth
              type="file"
              sx={{ mt: 1 }}
              onChange={handleProfileImage}
              name="image"
            />
            <TextField
              fullWidth
              type="number"
              value={phoneNumberInput}
              label="Phone Number"
              placeholder={
                currentUser ? currentUser.phoneNumber : "053-000-0000"
              }
              sx={{ mt: 1 }}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <TextareaAutosize
              fullWidth
              aria-label="minimum height"
              minRows={7}
              value={bioInput}
              placeholder={currentUser ? currentUser.bio : "Your bio"}
              style={{ width: 463, marginTop: 9 }}
              onChange={(e) => setBioInput(e.target.value)}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#581845" }}
              startIcon={<SaveIcon />}
            >
              Save
            </LoadingButton>
          </form>
        </Paper>
        {savedStatusToggle ? (
          <Paper
            elevation={10}
            sx={{
              width: 500,
              padding: "30px 20px",
              margin: "20px auto",
              textAlign: "center",
            }}
          >
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  checked={savedStatusToggle}
                  onChange={(event) => {
                    setSavedStatusToggle(event.target.checked);
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
            {currentUser ? (
              currentUser.pets.map((pet) => <Pet pet={pet} />)
            ) : (
              <h3>You currently do not own or foster any pets</h3>
            )}
          </Paper>
        ) : (
          <Paper
            elevation={10}
            sx={{
              width: 500,
              padding: "30px 20px",
              margin: "20px auto",
              textAlign: "center",
            }}
          >
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  checked={savedStatusToggle}
                  onChange={(event) => {
                    setSavedStatusToggle(event.target.checked);
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
            {currentUser ? (
              currentUser.favorite.map((pet) => <Pet pet={pet} />)
            ) : (
              <h3>You currently do not have any favorite pets</h3>
            )}
          </Paper>
        )}
      </Grid>
    </>
  );
}
