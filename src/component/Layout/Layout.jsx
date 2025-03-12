/* eslint-disable */

import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer"



export default function Layout() {




  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />


    </div>
  );
}
