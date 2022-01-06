import React, { useContext } from "react";
import AdminDrawer from "../Components/AdminDrawer";
import UserList from "../Components/UserList";
import AllPets from "../Components/AllPets";
import { AdoptContext } from "../Context/Context";

export default function AdminDashboard() {
  const { isClicked } = useContext(AdoptContext);

  return (
    <>
      <AdminDrawer />
      {isClicked ? <UserList /> : <AllPets />}
    </>
  );
}
