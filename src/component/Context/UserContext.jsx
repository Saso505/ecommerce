/* eslint-disable */

import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

export let UserContext = createContext(0);

const [token , setToken]=(localStorage.getItem("userToken"))
export default function UserContextProvider(props) {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {

      setUserLogin(localStorage.getItem("userToken"));
    }
  }, []);

  function decToken(){
    const {id}=jwtDecode(localStorage.getItem("userToken"));
 
    return id


  }

  useEffect(() => {
    decToken();
  }, [token]);
  
  const [userLogin, setUserLogin] = useState(null)
  return <UserContext.Provider value={{ userLogin, setUserLogin ,decToken}} >
    {props.children}

  </UserContext.Provider>
}
