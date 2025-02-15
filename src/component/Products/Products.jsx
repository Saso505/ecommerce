/* eslint-disable */
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishContext } from "../Context/WishContext";



import style from '../Products/Product.module.css';

export default function Products() {


  const { addProductCart } = useContext(CartContext);
  const { addProductWish } = useContext(WishContext);


  async function getProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  const { isLoading, error, data: products } = useQuery({
    queryKey: ["allproducts"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  if (isLoading) return <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/90 flex justify-center items-center h-screen">
    <span className="loader"><span className={`${style.loader} `}></span> </span>
  </div>
  if (error) return <div>Error loading products!</div>

  return (
    <div className="products py-5">
      <div className="head flex justify-center relative items-center py-5">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Our Products
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center w-3/4 mx-auto">
        {products.map((product) => (
          <div key={product._id} className=" lg:w-1/4 md:w-1/3 sm:w-1/2 w-full px-3 my-5">
            <div className="shadow-xl max-w-sm bg-white rounded-lg text-center main">

              <Link to={`/ProductDetails/${product._id}`}>
                <div className="image w-full">
                  <img className="w-full" src={product.imageCover} alt={product.title} />
                </div>
                <div className="p-3">
                  <span className="font-lato text-gray-400">{product.category?.name}</span>
                  <h5 className="line-clamp-1 text-xl font-bold tracking-tight text-gray-600">
                    {product.title}
                  </h5>
                  <div className="price flex justify-between items-center py-2">
                    <span className="text-green-600 font-semibold">{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="text-yellow-200 fa-solid fa-star"></i>
                    </span>
                  </div>
                </div>

              </Link>
              <Link to="/whish" >
                <div className="wish" onClick={() => addProductWish(product.id)}>
                  <i className="fa-regular fa-heart"></i>
                </div>
              </Link>
              <div className="button pb-2 px-3">
                <Link to="/cart">
                  <button
                    onClick={() => addProductCart(product.id)}
                    className="text-white w-full bg-[#2E4772] rounded-[20px] text-lg py-2 capitalize btn font-lato"
                  >
                    Add to Cart
                  </button></Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
