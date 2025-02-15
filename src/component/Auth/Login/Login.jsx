/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  let { setUserLogin } = useContext(UserContext)
  // Example state initialization (if needed)
  const [first, setFirst] = useState("");
  let Navigate = useNavigate();
  const [Loading, setLoding] = useState(false);

  //validation
  let validation = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),

    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
        " must be at least 6 characters, include one uppercase letter and one special character "
      )
      .required("Password is required"),
  });

  async function handleLogin(formvalue) {
    try {
      setLoding(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formvalue);

      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserLogin(data.token);
        formik.resetForm();
        toast.success(data.message)
        Navigate("/");
      }
      console.log(formvalue);
    } catch (err) {
      setLoding(false);
      console.log(err.response.data.message)
      setapiError(err?.response?.data?.message);


    }
  }

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validation,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    // Example logic (if needed)
    console.log("Component mounted");
  }, []);
  return (
    <>
      <div className="login     items-center w-full justify-center flex  h-screen   mx-auto ">
        <div className={`${style.glasscontainer} shadow-lg border container items-center xl:w-1/3 md:w-1/2  w-3/4 justify-center flex  rounded-xl  `}>

          <form onSubmit={formik.handleSubmit} className=" w-full justify-center flex  flex-col items-center">

            <h1
              className={`  md:text-[2.6rem] text-3xl  py-10 text-[#1f2937]  capitalize`}
            >
              welcome back !

            </h1>

            <div className="relative  z-0 w-3/4  py-5 group">
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-[#4b5563] appearance-none dark:text-white  dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300   peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute  font-lato text-lg text-[#4b5563] dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
              >
                Email
              </label>
              {formik.errors.email && formik.touched.email ? (
                <span className="font-medium  text-red-500  absolute text-xs py-3">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>


       <div className="forge flex items-center justify-end w-3/4">
       <Link to="/forgetpass" className="font-medium text-[#2e4772]  dark:text-blue-500 hover:underline ">
              Forgot password?
            </Link>
       </div>

            <div className="relative sm:mt-1 z-0 w-3/4 py-5   group">
              <input
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-[#4b5563] appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-lg text-[#4b5563]  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password ? (
                <span className="font-medium  text-red-500  absolute text-xs py-3 ">
                  {formik.errors.password}
                </span>
              ) : null}
            </div>

            <div className="btn-login w-full flex  items-center  justify-center py-10 ">
              {Loading ? (<button type="button" className="text-white w-1/2 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center "   >    <span class={`${style.loader} `}></span>   </button>) : (
                <button
                  type="submit"
                  className="text-white w-2/3 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-2 text-center me-2 mb-2"
                >

                  Login
                </button>
              )}
            </div>

            <div className="realtive py-5">
              <p className="text-[#4b5563] text-sm  absolute  md:left-44 sm:left-64  lg:left-80  xl:left-64 left-24  top-[88%]   xsm:left-32">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className={`font-bold  me-2 text-[#2E4772] `}
                >
                  Sign Up
                </Link>
              </p>
              {/* <div className="underline relative ">
                    <div className="line w-14 bg-white h-[0.125rem] absolute  sm:top-[3.3rem] sm:left-[11.8rem] xsm:top-16 xsm:left-24 "></div>
                  </div> */}
            </div>

          </form>
        </div>
      </div>

    </>
  );
}
