import LoggedOutNavBar from "../Components/LoggedOutNavBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ConfusedPets from "../Images/confused_pets.gif";

export default function MainPage() {
  return (
    <div>
      <LoggedOutNavBar />
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
          Welcome to Tales of Tails Adoption Agency
        </Typography>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            mt: 1,
          }}
        >
          Your new adoption agency. <br />
          Go ahead sign up and save a life today!
        </Typography>
      </Box>
    </div>
  );
}
