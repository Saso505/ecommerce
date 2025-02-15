import { useContext, useEffect, useState } from "react";
import style from "./Order.module.css";

import { useFormik } from 'formik';
import axios from 'axios';

import * as yup from 'yup'
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";


export default function Order() {

    const [IsCash, setIsCash] = useState(true);

    let { Id, reset } = useContext(CartContext);

    const token = localStorage.getItem("userToken")


    const [Loading, setLoding] = useState(false);

    //validation
    let validation = yup.object().shape({

        details: yup.string().required('details is required'),
        phone: yup.string().required('Phone number is required').matches(/^0\d{10}$/, 'Invalid phone number'),
        city: yup.string().required('city is required'),



    });
    async function CashOeder(formvalue) {
        try {
            setLoding(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${Id}`,
                {
                    "shippingAddress": formvalue
                },
                { headers: { token } }
            )
            console.log(data);
            if (data.status === "success") {
                formik.resetForm();
                toast.success("success")
                reset()

                // Navigate('/');
            }
            console.log(formvalue);
        } catch (err) {
            setLoding(false);
            console.log(err);
        }
    }

    async function onlineOeder(formvalue) {
        try {
            setLoding(true);

            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${Id}`,
                {
                    "shippingAddress": formvalue
                },
                {
                    headers: { token },
                    params: {
                        url: "http://localhost:5173"
                    }

                }
            )

            if (data.status === "success") {
                formik.resetForm();
                window.open(data.session.url);




            
            }
            console.log(formvalue);
        } catch (err) {
            setLoding(false);
            console.log(err);
        }
    }
    let formik = useFormik({
        initialValues: {

            "details": "",
            "phone": "",
            "city": ""
        },
        validationSchema: validation,
        onSubmit: IsCash ? CashOeder : onlineOeder
    });

    useEffect(() => {
        // Example logic (if needed)
        console.log("Component mounted");
    }, []);


    return (<>
        <div className="order   items-center w-full justify-center flex  h-screen  mx-auto " >
            <div className=" container items-center  justify-center flex  rounded-xl  md:shadow-custom-white "  >

                <div className={` z-1 md:rounded-r-xl rounded-xl md:shadow-none shadow-custom-white  md:w-1/2  w-3/4 ${style.glasscontainer}`}>
                    <form onSubmit={formik.handleSubmit} className="w-full flex  flex-col items-center justify-center " >





                        <div className="relative pt-5 sm:mt-1 z-0 w-3/4 md:py-2 py-3 group">
                            <input type="text" name="details" id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className="block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white  dark:border-white dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500   peer" placeholder=" " />
                            <label htmlFor="details" className="peer-focus:font-medium absolute  font-lato text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4" >details </label>
                            {formik.errors.details && formik.touched.details ?
                                <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.details}</span>
                                : null}
                        </div>
                        <div className="relative mt-3 sm:mt-1 z-0 w-3/4 md:py-2 py-3 group">
                            <input type="phone" name="phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-white dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500  peer" placeholder=" " />
                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-lg text-gray-500 font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 capitalize">phone</label>
                            {formik.errors.phone && formik.touched.phone ?
                                <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.phone}</span>
                                : null}
                        </div>


                        <div className="relative mt-3 sm:mt-1 z-0 w-3/4 md:py-2 py-3 group">
                            <input type="text" name="city" id="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className="block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-white dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500  peer" placeholder=" " />
                            <label htmlFor="city" className="peer-focus:font-medium absolute text-lg text-gray-500 font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4">city</label>
                            {formik.errors.city && formik.touched.city ?
                                <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.city}</span>
                                : null}
                        </div>





                        <div className="btn-cash w-full flex   items-center  justify-center  py-5 ">

                            {Loading ? <button type="button" className="text-white w-1/2 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center "   >    <span className={`${style.loader} `}></span>   </button> :
                                <button type="submit" onClick={() => setIsCash(true)} className="text-white w-1/2 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-2 text-center me-2 mb-2 capitalize"   >     Cash pay  </button>}
                        </div>

                        <div className="btn-online w-full flex   items-center  justify-center  py-5 ">

                            {Loading ? <button type="button" className="text-white w-1/2 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center "   >    <span className={`${style.loader} `}></span>   </button> :
                                <button type="submit" onClick={() => setIsCash(false)} className="text-white w-1/2 bg-gradient-to-r bg-[#2E4772]  hover:bg-gradient-to-br   font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-2 text-center me-2 mb-2 capitalize"   >     online pay  </button>}
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </>
    );
}


