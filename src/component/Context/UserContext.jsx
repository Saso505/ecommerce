/* eslint-disable */
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setUserLogin(jwtDecode(storedToken)); // Decoding and setting the user data
    }
  }, []);

  function decToken() {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      return jwtDecode(storedToken);
    }
    return null;
  }

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, decToken }}>
      {children}
    </UserContext.Provider>
  );
}
