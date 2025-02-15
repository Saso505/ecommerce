/* eslint-disable */

import React, { useEffect } from "react";
import style from "./Footer.module.css";

export default function Footer() {
  useEffect(() => {
    console.log("Footer component mounted");
  }, []);

  return (
    <>
      

<footer class="bg-[#a4cafe]  shadow-sm dark:bg-gray-900   ">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="flex items-center  justify-center py-2">
      
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium  text-gray-800 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 capitalize md:me-6">home</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 capitalize md:me-6">products</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 capitalize md:me-6">brand</a>
                </li>
                <li>
                    <a href="#" class="hover:underline capitalize ">categories</a>
                </li>
            </ul>
        </div>

        <span class="block text-xs  text-gray-600 sm:text-center py-2">© 2025 <a href="https://flowbite.com/" class="hover:underline"> Aespa</a>. All Rights Reserved.</span>
    </div>
</footer>


    </>
  );
}
