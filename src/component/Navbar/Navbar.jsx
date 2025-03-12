"use client";
/* eslint-disable */

import React, { useState, useContext } from "react";
import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function NavigationBar() {
  const { cartItems } = useContext(CartContext);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <>
      {/* Top Bar */}
      <nav className="border-gray-200 bg-black text-center md:px-0 px-2">
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl py-2">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="text-gray-200 hover:text-gray-700 transition duration-150 ease-in-out text-xs">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! Shop Now
            </span>
          </div>
        </div>
      </nav>

      {/* Main Navbar */}
      <FlowbiteNavbar className="bg-white shadow-sm py-3 px-8 sticky top-0 z-50">
        <div className="flex w-full justify-between items-center">
          
          {/* Brand Name */}
          <FlowbiteNavbar.Brand>
            <span className="font-april text-2xl font-medium text-black md:text-4xl">
              Aespa
            </span>
          </FlowbiteNavbar.Brand>

          {/* Navbar Links - Centered on Large Screens */}
          <div className="hidden md:flex items-center space-x-6 mx-auto">
            <NavLink to="/" className="text-lg text-gray-600">Home</NavLink>
            <NavLink to="/cart" className="text-lg text-gray-600">Cart</NavLink>
            <NavLink to="/brand" className="text-lg text-gray-600">Brand</NavLink>
            <NavLink to="/products" className="text-lg text-gray-600">Product</NavLink>
            <NavLink to="/categories" className="text-lg text-gray-600">Categories</NavLink>
          </div>

          {/* Cart & Wishlist - Centered in Mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden flex space-x-3 items-center">
            <Link to="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems?.numOfCartItems ?? 0}
              </span>
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
            </Link>

            <Link to="/wishlist">
              <i className="fa-regular fa-heart text-2xl text-[#DB4444]"></i>
            </Link>
          </div>

          {/* Navbar Toggle (Right Aligned) */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>

          {/* Logout/Login - Always on Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems?.numOfCartItems ?? 0}
              </span>
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
            </Link>

            <Link to="/wishlist">
              <i className="fa-regular fa-heart text-2xl text-[#DB4444]"></i>
            </Link>

            {userLogin ? (
              <button className="text-lg text-gray-600" onClick={logout}>Logout</button>
            ) : (
              <NavLink to="/login" className="text-lg text-gray-600">Login / Sign Up</NavLink>
            )}
          </div>
        </div>

        {/* Mobile Navbar Links - Show on Small Screens */}
        {isOpen && (
          <div className="flex flex-col space-y-2 items-center bg-white py-3 md:hidden">
            <NavLink to="/" className="text-sm text-gray-900">Home</NavLink>
            <NavLink to="/cart" className="text-sm text-gray-900">Cart</NavLink>
            <NavLink to="/brand" className="text-sm text-gray-900">Brand</NavLink>
            <NavLink to="/products" className="text-sm text-gray-900">Product</NavLink>
            <NavLink to="/categories" className="text-sm text-gray-900">Categories</NavLink>

            {/* Logout/Login for Mobile */}
            {userLogin ? (
              <button className="text-sm text-gray-900" onClick={logout}>Logout</button>
            ) : (
              <NavLink to="/login" className="text-sm text-gray-900">Login / Sign Up</NavLink>
            )}
          </div>
        )}
      </FlowbiteNavbar>
    </>
  );
}
