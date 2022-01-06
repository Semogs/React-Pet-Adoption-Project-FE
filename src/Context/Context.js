import React, { useState, createContext } from "react";

export const AdoptContext = createContext();

export function AdoptProvider({ children }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [petsList, setPetsList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  return (
    <AdoptContext.Provider
      value={{
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
        profilePicture,
        setProfilePicture,
        passwordAlert,
        setPasswordAlert,
        currentUser,
        setCurrentUser,
        isClicked,
        setIsClicked,
        petsList,
        setPetsList,
        usersList,
        setUsersList,
      }}
    >
      {children}
    </AdoptContext.Provider>
  );
}
