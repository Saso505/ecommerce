/* eslint-disable */
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishContext } from "../Context/WishContext";

import style from "../Products/Product.module.css";

export default function Products() {
  const [visable, setVisable] = useState(10);

  const { addProductCart } = useContext(CartContext);
  const { addProductWish } = useContext(WishContext);

  const addMore = () => {
    setVisable((prevValue) => prevValue + 10);
  };

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
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black flex justify-center items-center h-screen z-50">
        <span className="loader"><span className={`${style.loader} `}></span> </span>
      </div>
    );
  if (error) return <div>Error loading products!</div>;

  return (
    <div className="products container mx-auto px-10 py-5">
      <div className="head items-center py-5">
        <span className="text-sm font-semibold text-center header relative text-[#DB4444] mb-6 mx-4 px-2">
          Products
        </span>

        <h2 className="text-3xl font-bold text-black mb-6 py-5 mx-2">
          Browse By Products
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center w-full">
        {products.slice(0, visable).map((product) => (
          <div
            key={product._id}
            className="lg:w-1/5 md:w-1/3 sm:w-1/2 w-full px-3 my-5"
          >
            <div className="max-w-sm rounded-lg text-center main relative hov shadow-xl">
              <Link to="/whish">
                <div
                  className="wish absolute top-3 left-40 px-3 py-2 bg-[#DB4444] fav"
                  onClick={() => addProductWish(product.id)}
                >
                  <i className="fa-regular fa-heart text-white"></i>
                </div>
              </Link>

              <Link to={`/ProductDetails/${product._id}`}>
                <div className="image w-3/4 h-56 mx-auto">
                  <img
                    className="w-full h-full"
                    src={product.imageCover}
                    alt={product.title}
                  />
                </div>
              </Link>

              {/* "Add to Cart" button removed from Link */}
              <div className="button relative">
                <button
                  onClick={() => addProductCart(product.id)}
                  className="w-full btn text-sm py-2 absolute capitalize bg-black text-gray-50 font-lato"
                >
                  Add to Cart
                </button>
              </div>

              <div className="p-3 text-start bg-gray-50">
                <span className="font-lato text-sm text-gray-300">
                  {product.category?.name}
                </span>
                <h5 className="line-clamp-1 text-lg font-bold tracking-tight text-black">
                  {product.title}
                </h5>
                <div className="price flex justify-between items-center py-2">
                  <span className="text-[#DB4444] text-sm font-semibold">
                    {product.price} EGP
                  </span>

                  <span>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fa-solid fa-star text-sm ${index < Math.round(product.ratingsAverage)
                            ? "text-[#FFAD33]"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center w-full py-5">
          <button
            className="sm:w-1/6 w-1/2 text-sm py-2 bg-[#DB4444] text-gray-50 font-lato"
            onClick={addMore}
          >
            View More Products
          </button>
        </div>
      </div>
    </div>
  );
}
