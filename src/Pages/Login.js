import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CatVsDog from "../Images/cat_vs_dog.gif";
import TextField from "@mui/material/TextField";
import { AdoptContext } from "../Context/Context";
import axios from "axios";

export default function Login() {
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
  } = useContext(AdoptContext);

  const paperStyleLogin = {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#581845" };

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
        alert("Error: The email and password do not match ");
      });

    setEmailInput("");
    setPasswordInput("");
  };

  return (
    <Grid>
      <img
        src={CatVsDog}
        alt=""
        style={{
          right: "5%",
          top: "25%",
          position: "absolute",
          zIndex: -1,
          width: "100%",
        }}
      />
      <Paper elevation={10} style={paperStyleLogin}>
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
            inputProps={{ minLength: 6 }}
            placeholder="Your password must be at least 6 digits"
            type="password"
            fullWidth
            required
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
          <Typography sx={{ mt: 1 }}>
            <Link to="/signup"> Don't have an account yet?</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
}
