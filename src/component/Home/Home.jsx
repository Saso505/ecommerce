/* eslint-disable */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";
import lanimg from '../../assets/smiling-positive-brunette-brown-eyed-lady-stylish-outfit-posing-beige-room__1_-removebg-preview.png'
import Products from "../Products/Products";
import Footer from "../Footer/Footer"
import Categories from "../Category/Categories/Categories";


export default function Home() {
  useEffect(() => {
    // Add side-effects or page initialization logic here
  }, []);

  return <>
    <div className={`${style.home} h-screen  ` }>
      <div className={` bg-blue-300/70  shadow-sm `}>
        <div className="flex md:justify-between  items-center  px-8 py-16 container mx-auto  ">
          <div className="md:w-1/3 w-full   md:text-left py-7">
            <h2 className="lg:text-4xl md:text-xl text-md font-bold text-gray-800">Find the Best Fashion Style for You</h2>
            <p className="mt-4 text-gray-400 md:text-lg text-sm">
              Discover our wide range of products and enjoy a wonderful experience.
            </p>
            <button className="mt-6 bg-[#2E4772] text-white md:px-6 px-3  md:py-3 py-2 text-sm md:text-lg rounded-lg hover:bg-[#2e47728b]">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src={lanimg} // Replace with a real image URL
            alt="Fashion Model"
            className="rounded-2xl shadow-xl w-3/5"
          />
        </div>
        </div>
      
      </div>'
      <Categories />
      <Products></Products>


      <Footer></Footer>
    </div>

  </>
}
