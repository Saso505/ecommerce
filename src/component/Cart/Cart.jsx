import { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

import style from "./Cart.module.css";
import { Link } from "react-router-dom";
export default function Cart() {
  const { getProductCart, cartItems, updateProductCart, Loading, deleteProductCart, clearProductCart } = useContext(CartContext);



  useEffect(() => {
    async function fetchCart() {

      await getProductCart();

    }
    fetchCart();
  }, []);



  return (
    <div className="container mx-auto mt-30">
      {/* Show Loader While Fetching */}
      {Loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/85 flex justify-center items-center h-screen">
          <span className="loader"><span className={`${style.loader} `}></span> </span>
        </div>
      )}

      {/* Show Empty Cart Message */}
      {!Loading && (!cartItems || cartItems?.data?.products?.length === 0) && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty!</h2>
          <p className="text-gray-500">Start adding products to see them here.</p>
        </div>
      )}

      {/* Show Cart Table */}
      {!Loading && cartItems?.data?.products?.length > 0 && (
        <>
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Your Cart
          </h1>
          <a onClick={() => clearProductCart()} className="text-red-800 py-5  text-lg   line-clamp-1 ">clear</a>

          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 shadow-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-16 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.data.products.map((product) => (
                  <tr key={product.product._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <img src={product.product.imageCover} className="w-16 md:w-32" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold">{product.product.title}</td>
                    <td>
                      <div className="flex items-center">
                        <button onClick={() => updateProductCart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div className="ms-3">
                          <span className="text-lg">{product.count}</span>
                        </div>
                        <button onClick={() => updateProductCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>

                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">${product.price}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => deleteProductCart(product.product.id)} className="text-red-600 hover:underline">
                        <i className="fa-solid fa-trash px-2"></i>Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="div py-9">

              <Link to="/order">      <button type="button" className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                Buy now
              </button></Link>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
