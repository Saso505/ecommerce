/* eslint-disable */
import React, { useState } from "react";
import style from "./ResetCode.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function ResetCode() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // Function to handle API call
    async function handleResetCode(formValues) {
        setLoading(true);
        setApiError(null);

        try {
            let response = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                { resetCode: formValues.resetCode }
            );

            console.log(response.data);

            if (response.data.status === "Success") {
               
                formik.resetForm();
                navigate("/updatepass");
            }
        } catch (err) {
            setApiError(err.response?.data?.message || "Invalid Reset Code");
        } finally {
            setLoading(false);
        }
    }

    // Formik Configuration
    let formik = useFormik({
        initialValues: { resetCode: "" }, // ✅ Use correct key
        onSubmit: handleResetCode,
    });

    return (
        <div className="flex items-center w-full justify-center h-screen mx-auto">
            <div className={`${style.glasscontainer} shadow-lg border container items-center xl:w-1/3 md:w-1/2 w-3/4 justify-center flex rounded-xl`}>
                <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
                    <h1 className="md:text-[2.8rem] text-3xl py-5 text-[#1f2937] capitalize">Reset Code</h1>

                    <div className="relative z-0 w-3/4 py-5 group">
                        <input
                            type="text"
                            name="resetCode"
                            id="resetCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.resetCode}
                            className="block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-[#4b5563] appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="resetCode"
                            className="peer-focus:font-medium absolute font-lato text-lg text-[#4b5563] dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                        >
                            Enter Your Code
                        </label>
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
