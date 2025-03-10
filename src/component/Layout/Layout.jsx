/* eslint-disable */

import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  // Example state initialization (if needed)
  const [first, setFirst] = useState("");

  useEffect(() => {
    // Example logic (if needed)
    console.log("Component mounted");
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
   
    </div>
  );
}
