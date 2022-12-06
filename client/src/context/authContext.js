import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // user info is string store inside the local storage.
  // want make string to be JSON
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // create a login function here

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  // create logout function here

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  // update current user when everytime needed
  // whenever we update the current user, we udpate the information in local store

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser)); // transfer object to string
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  ); // childern is app.js
};
