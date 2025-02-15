import { useContext, useEffect } from "react";

import { WishContext } from "../Context/WishContext";


import style from '/src/component/WishList/Wish.module.css'


export default function WishList() {

    let { Wishtems, Loading, getProductWish, deleteProductWish } = useContext(WishContext)
    console.log('hish', Wishtems);
    useEffect(() => {
        async function fetchCart() {

            await getProductWish();

        }
        fetchCart();
    }, []);

    return (
        <>




            <div className="container mx-auto mt-30">
                {/* Show Loader While Fetching */}
                {Loading && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/85 flex justify-center items-center h-screen">
                        <span className="loader"><span className={`${style.loader} `}></span> </span>
                    </div>
                )}

                {/* Show Empty Cart Message */}
                {!Loading && (!Wishtems || Wishtems?.data?.length === 0) && (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty!</h2>
                        <p className="text-gray-500">Start adding products to see them here.</p>
                    </div>
                )}

                {/* Show Cart Table */}
                {!Loading && Wishtems?.data && (
                    <>
                        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6 py-10">
                            Your wishlist
                        </h1>

                        <div className="relative overflow-x-auto sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 shadow-lg">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-16 py-3">Image</th>
                                        <th className="px-6 py-3">Product</th>

                                        <th className="px-6 py-3">Price</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Wishtems.data.map((product) => (
                                        <tr key={product._id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <img src={product.imageCover} className="w-16 md:w-32" alt={product.title} />
                                            </td>
                                            <td className="px-6 py-4 font-semibold">{product.title}</td>

                                            <td className="px-6 py-4 text-green-600 font-semibold">${product.price}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => deleteProductWish(product.id)} className="text-red-600 hover:underline">
                                                    <i className="fa-solid fa-trash px-2"></i>Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}
