/* eslint-disable */

import React, { useEffect, useState } from "react";
import style from "./ForgetPass.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Validation Schema
  let validation = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email address"),
  });

  async function handleForgetPass(formValue) {
    try {
      setLoading(true);
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        formValue
      );
      console.log(response); 

      if (response.data.statusMsg
        === "success") {
        formik.resetForm();
        console.log(response); 
        
navigate('/rsetcode')
      }
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message || "An error occurred");
      setApiError(err.response?.data?.message);
    }
  }

  let formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validation,
    onSubmit: handleForgetPass,
  });

  return (
    <div className="forget flex items-center w-full justify-center h-screen mx-auto">
      <div
        className={`${style.glasscontainer} shadow-lg border container items-center xl:w-1/3 md:w-1/2 w-3/4 justify-center flex rounded-xl`}
      >
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
          <h1 className="md:text-[2.8rem] text-3xl py-5 text-[#1f2937] capitalize">
            Forget Password
          </h1>

          <div className="relative z-0 w-3/4 py-5 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-[#4b5563] appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute font-lato text-lg text-[#4b5563] dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <span className="font-medium text-red-500 absolute text-xs py-3">
                {formik.errors.email}
              </span>
            ) : null}
          </div>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <div className="btn-login w-full flex items-center justify-center py-10">
            {loading ? (
              <button
                type="button"
                className="text-white w-1/2 bg-[#2E4772] hover:bg-[#1e3555] focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px] py-1 text-center"
              >
                <span className={`${style.loader}`} />
              </button>
            ) : (
              <button
                type="submit"
                className="text-white w-2/3 bg-[#2E4772] hover:bg-[#1e3555] font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl py-2 text-center"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
