/* eslint-disable */

import React, { useEffect, useState } from "react";

import QRCode from 'qrcode'

export default function Footer() {

    const [url, setUrl] = useState('')
    const [qr, setQr] = useState('')
    let code = localStorage.setItem('qrcode', qr);
    console.log(code)

    const GenerateQRCode = () => {
        QRCode.toDataURL(url, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000',
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)

            setQr(url)
        })
    }



    return (
        <>

            <footer className=" bg-black mt-10">
                <div className="mx-auto w-full max-w-screen-xl">
                    <div className="grid grid-cols-2 gap-12 px-12 py-6 lg:py-8 md:grid-cols-5 mx-auto ">
                        <div>
                            <h2 className="mb-6 text-lg font-semibold text-gray-50 uppercase dark:text-white">Aespa</h2>
                            <ul className="text-gray-100 dark:text-gray-400 font-medium text-sm">
                                <li className="mb-4">
                                    <a href="#" className=" hover:underline">Subscribe</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200"    >Get 10% off your first order</a>
                                </li>
                                <li className="mb-4">

                                    <form className=" mx-auto">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none">

                                            </div>
                                            <input type="search" id="default-search" className="block w-3/4   text-sm text-gray-100 border border-gray-100  bg-black focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:text-white " placeholder="enter your email" required />
                                            <button type="submit" className="text-white absolute sm:right-11 right-6 top-0 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa-regular fa-paper-plane"></i></button>
                                        </div>
                                    </form>


                                </li>

                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase   text-white"> Support</h2>
                            <ul className="text-gray-100 text-sm font-medium" >
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh </a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200">exclusive@gmail.com</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-300">+88015-88888-9999</a>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Account</h2>
                            <ul className="text-gray-100 text-sm font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-100">My Account</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-100">Login / Register</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200">Cart</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200">Wishlist</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-300">Shop</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Quick Link</h2>
                            <ul className="text-gray-100 text-sm font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-100">Privacy Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200">Terms Of Use</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200">FAQ</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-300">FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div >
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-white"> Download App</h2>
                            <ul className="text-gray-100 text-sm font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-400"> Save $3 with App New User Only</a>
                                </li>
                                <li className="mb-4 ">
                                    <div className="app  flex justify-between  py-3" >

                                        <input
                                            className="bg-black w-full text-sm"
                                            type="text" 
                                            placeholder="e.g https://google.com"
                                            value={url}
                                            onChange={e => setUrl(e.target.value)} />
                                        <button onClick={GenerateQRCode} className="px-2">Generate</button>

                                    </div>

                                    <div className="qr w-1/2">
                                        {qr && <>
                                            <img src={qr} />

                                        </>}
                                    </div>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-gray-200">
                                        <div className="icons">
                                            <i className="fa-brands  fa-facebook-f"></i>
                                            <i className="fa-brands px-3 sm:px-6 fa-twitter"></i>
                                            <i className="fa-brands  fa-instagram"></i>

                                            <i className="fa-brands px-3  sm:px-6 fa-linkedin-in"></i>
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="px-4 py-6 bg-black text-center  ">
                        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights Reserved.
                        </span>
                       
                              
                    </div>
                </div>
            </footer>



        </>
    );
}
