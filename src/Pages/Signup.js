import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import CatVsDog from "../Images/cat_vs_dog.gif";
import { AdoptContext } from "../Context/Context";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function Signup() {
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    confirmPassword,
    setConfirmPassword,
    firstNameInput,
    setFirstNameInput,
    lastNameInput,
    setLastNameInput,
    phoneNumberInput,
    setPhoneNumberInput,
    passwordAlert,
    setPasswordAlert,
  } = useContext(AdoptContext);

  const paperStyleSignup = {
    padding: "30px 20px",
    width: 450,
    margin: "20px auto",
  };
  const headerStyle = { marginBottom: 10 };
  const avatarStyle = { backgroundColor: "#581845" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput !== confirmPassword) {
      setPasswordAlert(true);
    } else {
      setPasswordAlert(false);
      const registered = {
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPassword,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneNumberInput,
      };
      axios
        .post("http://localhost:4000/auth/signup", registered)
        .then((res) => console.log(res.data));

      window.location = "/login";
    }
    setEmailInput("");
    setPasswordInput("");
    setConfirmPassword("");
    setFirstNameInput("");
    setLastNameInput("");
    setPhoneNumberInput("");
  };

  return (
    <Grid>
      <img
        src={CatVsDog}
        alt=""
        style={{
          right: "5%",
          top: "38%",
          position: "absolute",
          zIndex: -1,
          width: "100%",
        }}
      />
      <Paper elevation={20} style={paperStyleSignup}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={emailInput}
            required
            placeholder="John@somemail.com"
            sx={{ mt: 2 }}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={passwordInput}
            required
            inputProps={{ minLength: 6 }}
            placeholder="Your password must be at least 6 digits"
            sx={{ mt: 1 }}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            required
            inputProps={{ minLength: 6 }}
            placeholder="Confirm your password"
            sx={{ mt: 1 }}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {passwordAlert ? (
            <Alert severity="error" sx={{ mt: 1 }}>
              <strong>The password you entered does not match</strong>
            </Alert>
          ) : (
            <Alert severity="error" sx={{ display: "none" }}>
              <strong>The password you entered does not match</strong>
            </Alert>
          )}
          <TextField
            fullWidth
            type="text"
            value={firstNameInput}
            label="First Name"
            placeholder="John"
            required
            sx={{ mt: 1 }}
            onChange={(e) => setFirstNameInput(e.target.value)}
          />
          <TextField
            fullWidth
            type="text"
            label="Last Name"
            value={lastNameInput}
            placeholder="Doe"
            sx={{ mt: 1 }}
            onChange={(e) => setLastNameInput(e.target.value)}
          />
          <TextField
            fullWidth
            type="number"
            value={phoneNumberInput}
            label="Phone Number"
            placeholder="Enter your phone number"
            inputProps={{ minLength: 9 }}
            sx={{ mt: 1 }}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#581845" }}
          >
            Sign up
          </Button>
          <Typography sx={{ mt: 2 }}>
            <Link to="/login">Already have an account ?</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
}
