/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import style from "./Updatepass.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";

export default function UpdatePass() {


    let Navigate = useNavigate();
    const [Loading, setLoding] = useState(false);
  

    //validation
    let validation = yup.object().shape({
        currentPassword: yup
            .string()
            .matches(
                /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                " must be at least 6 characters, include one uppercase letter and one special character "
            )
            .required("Password is required"),
        password: yup
            .string()
            .matches(
                /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                " must be at least 6 characters, include one uppercase letter and one special character "
            )
            .required("Password is required"),

        rePassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    async function handleUpdate(formValue) {
        try {
            setLoding(true);
    
            const token = localStorage.getItem("userToken");
          
    
            if (!token) {
                console.error("No token found. Redirecting to login.");
                Navigate("/login");
                return;
            }
    
            console.log("Token being sent:", token); // Debugging
    
            let response = await axios.put(
                "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
                formValue,
                {
                    headers: {
                        token: token,
                        "Content-Type": "application/json", 
                    },
                }
            );
    
            console.log("API Response:", response);
    
            if (response.data.message === "success") {
                localStorage.setItem("userToken", response.data.token);
                formik.resetForm();
                Navigate("/resetpass");
            }
        } catch (err) {
            setLoding(false);
            
            if (err.response) {
                console.error("API Error:", err.response.data.message);
                setapiError(err.response.data.message);
            } else {
                console.error("Request failed:", err.message);
                setapiError("Something went wrong. Please try again.");
            }
        }
    }
    
    let formik = useFormik({
        initialValues: {
            currentPassword:"",
            password:"",
            rePassword:""
        },
        validationSchema: validation,
        onSubmit: handleUpdate,
    });
    return (
        <>

            <div className="update  items-center w-full justify-center flex  h-screen   mx-auto ">
                <div className={`${style.glasscontainer} shadow-lg border container items-center xl:w-1/3 md:w-1/2  w-3/4 justify-center flex  rounded-xl  `}>

                    <form onSubmit={formik.handleSubmit} className=" w-full justify-center flex  flex-col items-center">

                        <h1
                            className={`  md:text-[2.8rem] text-3xl  py-5 text-[#1f2937]  capitalize`}
                        >
                            Update password

                        </h1>

                        <div className="relative  z-0 w-3/4  py-5 group">
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.currentPassword}
                                className="block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-[#4b5563] appearance-none dark:text-white  dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300   peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="currentPassword"
                                className="peer-focus:font-medium absolute  font-lato text-lg text-[#4b5563] dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                            >
                                currentPassword
                            </label>
                            {formik.errors.currentPassword && formik.touched.currentPassword ? (
                                <span className="font-medium  text-red-500  absolute text-xs py-3">
                                    {formik.errors.currentPassword}
                                </span>
                            ) : null}
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


                        <div className="relative sm:mt-1 z-0 w-3/4 py-5   group">
                            <input
                                type="password"
                                name="rePassword"
                                id="rePassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                className="block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-[#4b5563] appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="rePassword"
                                className="peer-focus:font-medium absolute text-lg text-[#4b5563]  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                            >
                                rePassword
                            </label>
                            {formik.errors.rePassword && formik.touched.rePassword ? (
                                <span className="font-medium  text-red-500  absolute text-xs py-3 ">
                                    {formik.errors.rePassword}
                                </span>
                            ) : null}
                        </div>





                        <div className="btn-login w-full flex  items-center  justify-center py-10 ">
                            {Loading ? (<button type="button" className="text-white w-1/2 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center "   >    <span class={`${style.loader} `}></span>   </button>) : (
                                <button
                                    type="submit"
                                    className="text-white w-2/3 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-2 text-center me-2 mb-2"
                                >

                                    update
                                </button>
                            )}
                        </div>



                    </form>
                </div>
            </div>

        </>
    )
}
