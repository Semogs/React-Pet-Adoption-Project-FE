import LoggedInNavBar from "../Components/LoggedInNavBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ConfusedPets from "../Images/confused_pets.gif";
import React, { useContext } from "react";
import { AdoptContext } from "../Context/Context";

export default function Home() {
  const { currentUser } = useContext(AdoptContext);

  return (
    <div>
      <LoggedInNavBar />
      <img
        src={ConfusedPets}
        alt=""
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          top: "30%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          mt: 3,
        }}
      >
        <Typography variant="h4" component="div" gutterBottom>
          Welcome {currentUser ? currentUser.email : null}
        </Typography>
      </Box>
    </div>
  );
}
