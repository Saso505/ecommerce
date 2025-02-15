"use client";
/* eslint-disable */

import React from "react";
import { Navbar as FlowbiteNavbar } from "flowbite-react"; // Rename import to avoid collision
import { Link, Navigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { CounterContext } from "../Context/CounterContext";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";
import cart from'../../assets/cart.jpg'

export default function NavigationBar() {
 let {cartItems}= useContext(CartContext);

  function logout() {
    setUserLogin(null);
    localStorage.removeItem('userToken');
    Navigate('login');
  }
  let x = useContext(CounterContext);
  console.log(x);
  let { userLogin, setUserLogin } = useContext(UserContext);
  return (
    <FlowbiteNavbar className="bg-white shadow-sm py-3 px-8 flex justify-between items-center">
      <FlowbiteNavbar.Brand href="#">
        <span className="self-center text-2xl font-semibold whitespace-nowrap  text-gray-700 font-main  md:text-4xl order-1">
          Aespa
        </span>
      </FlowbiteNavbar.Brand>
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse className="order-3 md:order-2 ">

        {userLogin !== null ?
          <> <NavLink to="/"
            className=" text-lg font-lato capitalize font-meduim    block py-2 px-3 text-gray-700 hover:text-gray-900   rounded-sm md:bg-transparent  md:p-0 md:dark:text-blue-500"
            aria-current="page"
          >
            Home
          </NavLink>
            <NavLink
              to="/cart"
              className="text-lg font-lato capitalize font-medium block py-2 px-3 text-gray-700 hover:text-gray-900  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              cart
            </NavLink>
            <NavLink
              to="/brand"
              className="text-lg font-lato capitalize font-medium block py-2 px-3 text-gray-700 hover:text-gray-900  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              brand
            </NavLink>
            <NavLink
              to="/products"
              className="text-lg font-lato capitalize font-medium block py-2 px-3 text-gray-700 hover:text-gray-900  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              product
            </NavLink>
            <NavLink
              to="/categories"
              className="text-lg font-lato capitalize  font-medium block py-2 px-3text-gray-700 hover:text-gray-900  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >categories

            </NavLink>
          </>
          : null}

      </FlowbiteNavbar.Collapse>
     
      <div className="icons ">
        <ul className="relative">
          <li > <span className="text-gray-100 text-md hover:text-gray-100 mt-1  font-bold font-lato  absolute -top-4 bg-slate-900 px-1 rounded-full left-6">
              { cartItems? cartItems.numOfCartItems :0}
            </span><img src={cart} className="w-8 " alt="" />  </li>
        
        </ul>
      </div>
      <div className="flex  space-x-3 md:space-x-0 rtl:space-x-reverse order-2 md:order-3">
        <button
          type="button"
          className="border border-[#2E4772] px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
        >
          {userLogin === null ?
            <>
              <Link to="/login" > Login  </Link>
              <Link className="px-1 " to="/register">    / sign up </Link>
            </>
            : <span className="px-1   cursor-pointer" to="/register" onClick={logout}>   logout  </span>}
  

        </button>
      </div>
    </FlowbiteNavbar>
  );
}
