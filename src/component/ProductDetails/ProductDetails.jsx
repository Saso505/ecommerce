/* eslint-disable */
import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";


import Slider from "react-slick";
import style from "./ProductDetails.module.css";



import { CartContext } from "../Context/CartContext";
import { WishContext } from "../Context/WishContext";

export default function ProductDetails() {
  let { id } = useParams();
  const [Details, setDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Related, setRelated] = useState([]);
  const { addProductCart } = useContext(CartContext);
  const { addProductWish } = useContext(WishContext);




  // Fetch product details


  async function getProductDetails() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );

      setDetails(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  // Fetch related products
  async function getRelated() {
    try {
      if (!Details?.category?.name) return;

      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log("All Products:", data?.data);


      const filtered = data?.data?.filter(
        (item) => item?.category?.name === Details.category.name
      );
      setRelated(filtered.slice(0, 4));

      console.log("Filtered Related Products:", filtered.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (Details?.category?.name) {
      getRelated();
    }
  }, [Details]);
  const swiperRef = useRef(null);


  var settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  if (Loading)
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black flex justify-center items-center h-screen z-50">
        <span className="loader"><span className={`${style.loader} `}></span> </span>
      </div>
    );


  return (
    <>
    <div className="all bg-gray-100">
      <div className="container mx-auto py-10  ">

        {Details && (
          <div className="row items-center justify-center ">
            <div className="lg:w-1/5 md:w-1/4 w-1/3 shadow-lg " >


              <Slider {...settings}>
                {Details?.images.map((src) =>
                  <img
                    key={src}
                    className="rounded-xl w-full  "
                    src={src}
                    alt={Details.title}
               
                  

                  />

                )}

              </Slider>

            </div>
            <div className="w-3/4 md:px-20 md:py-0 py-10">
              <h2 className="text-xl font-bold mt-5 text-black">
                {Details.title}
              </h2>
              <span>
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star text-[10px] ${index < Math.round(Details.ratingsAverage)
                      ? "text-[#FFAD33]"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </span>
              <p className="text-sm  py-2 font-semibold text-[#DB4444]  ">
                {Details.price} EGP
              </p>

              <p className="text-md mt-2 text-[#2E4772]">{Details.description}</p>

              <div className="mt-5">
                {Loading ? (
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-black flex justify-center items-center h-screen z-50">
                    <span className="loader"><span className={`${style.loader} `}></span> </span>
                  </div>
                ) : (
                  <Link to="/cart">
                    <button onClick={() => addProductCart(Details.id)} className="text-white w-1/4 bg-black text-sm py-2   rounded-md  capitalize">
                      Add to Cart
                    </button>
                  </Link>


                )}
                {Loading ? (
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-black flex justify-center items-center h-screen z-50">
                    <span className="loader"><span className={`${style.loader} `}></span> </span>
                  </div>
                ) : (
                  <Link to="/whish">
                    <span
                      className="  mx-4 px-2 py-2 shadow-xl rounded-md   "
                      onClick={() => addProductWish(Details.id)}
                    >
                      <i className="fa-regular fa-heart text-sm text-[#DB4444] "></i>
                    </span>
                  </Link>


                )}


              </div>
            </div>
          </div>
        )}


      </div>

      {/* Related Products Swiper */}
      <div className="container mx-auto py-10 px-10">

        <div className="py-24">
          <span className="text-sm font-semibold text-center header relative text-[#DB4444] mb-6 mx-4 px-2">
            Related Products
          </span>
          <div className="flex flex-wrap items-center justify-center w-full py-5">
            {Related.length > 0 && (
              Related.map((Related) => (

              <div
                key={Related._id}
                className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full gap-6 px-3 my-5"
              >
                <div className="max-w-sm rounded-lg text-center main relative hov shadow-xl">
                  <Link to="/whish">
                    <div
                      className="wish absolute top-3 left-40 px-3 py-2 bg-[#DB4444] fav"
                      onClick={() => addProductWish(Related.id)}
                    >
                      <i className="fa-regular fa-heart text-white"></i>
                    </div>
                  </Link>

                  <Link to={`/ProductDetails/${Related._id}`}>
                    <div className="image w-3/4 h-56 mx-auto">
                      <img
                        className="w-full h-full"
                        src={Related.imageCover}
                        alt={Related.title}
                      />
                    </div>
                  </Link>

              
                  <div className="button relative">
                    <button
                      onClick={() => addProductCart(Related.id)}
                      className="w-full btn text-sm py-2 absolute capitalize bg-black text-gray-50 font-lato"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="p-3 text-start bg-gray-50">
                <span className="font-lato text-sm text-gray-300">
                  {Related.category?.name}
                </span>
                <h5 className="line-clamp-1 text-lg font-bold tracking-tight text-black">
                  {Related.title}
                </h5>
                <div className="price flex justify-between items-center py-2">
                  <span className="text-[#DB4444] text-sm font-semibold">
                    {Related.price} EGP
                  </span>

                  <span>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fa-solid fa-star text-sm ${index < Math.round(Related.ratingsAverage)
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
            )
            ))}


          </div>
        </div>
      </div>
      </div>
    </>


  );
}
