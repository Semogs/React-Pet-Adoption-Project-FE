import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { AdoptContext } from "../Context/Context";
import axios from "axios";
import Alert from "@mui/material/Alert";

const paperStyleLogin = {
  padding: 20,
  height: "53vh",
  width: 400,
  margin: "20px auto",
};

const paperStyleSignup = {
  paddingTop: 7,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  width: 450,
  margin: "20px auto",
};

const headerStyle = { marginBottom: 10, marginTop: 0 };

const avatarStyle = { backgroundColor: "#581845" };

export default function SignUpModal() {
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
  const [modal, setModal] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (passwordInput !== confirmPassword) {
      setPasswordAlert(true);
    } else {
      setPasswordAlert(false);
      const registered = {
        email: emailInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneNumberInput,
        Admin: "false",
      };
      axios.post("http://localhost:4000/auth/signup", registered);
      window.location = "/login";
    }
    setEmailInput("");
    setPasswordInput("");
    setConfirmPassword("");
    setFirstNameInput("");
    setLastNameInput("");
    setPhoneNumberInput("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const logged = {
      email: emailInput,
      password: passwordInput,
    };
    axios
      .post("http://localhost:4000/auth/login", logged)
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem(
          "Admin",
          JSON.stringify(res.data.signedUser.Admin)
        );
        if (res.data.signedUser.Admin === "true")
          window.location.pathname = "/admin";
        else window.location.pathname = "/home";
      })
      .catch((error) => {
        setPasswordAlert("Error: The email and password do not match ");
      });
    setEmailInput("");
    setPasswordInput("");
  };

  return (
    <div>
      <Button onClick={() => setModal(!modal)} sx={{ color: "white" }}>
        Login
      </Button>
      <Modal
        open={modal}
        onClose={() => setModal(!modal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {toggleSignup ? (
          <Grid>
            <Paper elevation={20} style={paperStyleLogin}>
              <Grid align="center">
                <Avatar style={avatarStyle}></Avatar>
                <h2>Sign In</h2>
              </Grid>
              <form onSubmit={handleLogin}>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="John@somemail.com"
                  fullWidth
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <TextField
                  label="Password"
                  sx={{ mt: 1 }}
                  placeholder="Your password must be at least 6 digits"
                  type="password"
                  fullWidth
                  required
                  inputProps={{ minLength: 6 }}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "#581845", margin: "8px 0" }}
                >
                  Sign in
                </Button>
                <Typography
                  sx={{ mt: 1, cursor: "pointer" }}
                  onClick={() => setToggleSignup(!toggleSignup)}
                >
                  <Link> Don't have an account yet?</Link>
                </Typography>
              </form>
            </Paper>
          </Grid>
        ) : (
          <Paper elevation={20} style={paperStyleSignup}>
            <Grid align="center">
              <h2 style={headerStyle}>Sign Up</h2>
              <Typography variant="caption" gutterBottom>
                Please fill this form to create an account !
              </Typography>
            </Grid>
            <form onSubmit={handleSignup}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={emailInput}
                required
                placeholder="John@somemail.com"
                sx={{ mt: 1 }}
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
                sx={{ mt: 1 }}
                onChange={(e) => setPhoneNumberInput(e.target.value)}
                inputProps={{ minLength: 9 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, backgroundColor: "#581845" }}
              >
                Sign up
              </Button>
              <Typography
                sx={{ mt: 1, cursor: "pointer" }}
                onClick={() => setToggleSignup(!toggleSignup)}
              >
                <Link> Already have an account ?</Link>
              </Typography>
            </form>
          </Paper>
        )}
      </Modal>
    </div>
  );
}
