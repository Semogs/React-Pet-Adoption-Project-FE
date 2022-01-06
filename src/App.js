import "./App.css";
import MainPage from "./Pages/MainPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import AddPet from "./Pages/AddPet";
import React, { useContext, useEffect } from "react";
import { AdoptContext } from "./Context/Context";
import ProtectedRoute from "./Components/ProtectedRoute";
import axios from "axios";
import EditPet from "./Pages/EditPet";
import User from "./Pages/User";

function App() {
  const { setCurrentUser, setPetsList, setUsersList } =
    useContext(AdoptContext);
  let token = false;
  token = JSON.parse(localStorage.getItem("token"));
  const adminRole = JSON.parse(localStorage.getItem("Admin"));

  useEffect(() => {
    const headerConfig = {
      "auth-token": `${token}`,
    };
    axios
      .get("http://localhost:4000/user/current", { headers: headerConfig })
      .then((res) => {
        setCurrentUser(res.data);
      });
  }, [setCurrentUser]);

  useEffect(() => {
    const headerConfig = {
      "auth-token": `${token}`,
    };
    axios
      .get("http://localhost:4000/user", { headers: headerConfig })
      .then((res) => {
        setUsersList(res.data);
      });
  }, [setUsersList]);

  useEffect(() => {
    const headerConfig = {
      "auth-token": `${token}`,
    };
    axios
      .get("http://localhost:4000/pet", { headers: headerConfig })
      .then((res) => {
        setPetsList(res.data);
      });
  }, [setPetsList]);

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <ProtectedRoute
          exact
          path="/admin"
          component={AdminDashboard}
          auth={token && adminRole === "true"}
        />
        <ProtectedRoute exact path="/home" component={Home} auth={token} />
        <ProtectedRoute exact path="/search" component={Search} auth={token} />
        <ProtectedRoute
          exact
          path="/profile"
          component={Profile}
          auth={token && adminRole === "false"}
        />
        <ProtectedRoute
          exact
          path="/add-pet"
          component={AddPet}
          auth={token && adminRole === "true"}
        />
        <ProtectedRoute
          exact
          path="/edit-pet/:id"
          component={EditPet}
          auth={token && adminRole === "true"}
        />
        <ProtectedRoute
          exact
          path="/user/:id"
          component={User}
          auth={token && adminRole === "true"}
        />
      </Router>
    </div>
  );
}

export default App;
