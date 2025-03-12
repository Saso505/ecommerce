/* eslint-disable */
import React, { useEffect } from "react";

import style from "./Home.module.css";
import lanimg from '../../assets/pexels-n-voitkevich-6214470.jpg'
import Products from "../Products/Products";
import Footer from "../Footer/Footer"
import Categories from "../Category/Categories/Categories";


export default function Home() {


  return <>
    <div>
      <div className={`shadow-sm bg-black  mb-10  rounded-2xl mx-2`}>
        <div className="flex md:justify-between items-center md:flex-row  flex-col py-5  px-8  container mx-auto  ">
          <div className="md:w-1/3   md:py-0 py-2  md:order-1 md:order-1 order-2 md:text-left ">
            <h2 className="lg:text-4xl md:text-xl text-md font-bold text-gray-200">Find the Best Fashion Style for You</h2>
            <p className="md:mt-4 mt-2 text-gray-300 py-4 md:text-lg text-sm">
              Discover our wide range of products and enjoy a wonderful experience.
            </p>
            <button className="md:mt-6 mt-2 shadow-customwhit   text-[#DB4444] bg-white md:px-6 px-3  md:py-3 py-2 text-sm md:text-lg rounded-lg hover:bg-[#2e47728b]">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2  h-full   order-1 mt-8 md:mt-0 flex justify-center">
          <img
            src={lanimg} 
            alt="Fashion Model"
            className="rounded-2xl  w-3/5 h-full   shadow-customwhit   "
          /> 
        </div>
        </div>
      
      </div>
      <Categories />
      <Products></Products>


    </div>

  </>
}
