import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";


import Slider from "react-slick";
import style from "./ProductDetails.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CartContext } from "../Context/CartContext";

export default function ProductDetails() {
  let { id } = useParams();
  const [Details, setDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Related, setRelated] = useState([]);

  // Fetch product details
  
    const { addProductCart } = useContext(CartContext);
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
      setRelated(filtered.slice(0, 10));

      console.log("Filtered Related Products:", filtered.slice(0, 10));
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

  return (
    <>
      <div className="container mx-auto py-10 px-10">

        {Details && (
          <div className="row items-center justify-center">
            <div className="lg:w-1/5 md:w-1/4 w-1/3">

              <Slider {...settings}>
                {Details?.images.map((src) =>
                  <img
                    key={src}
                    className="rounded-xl w-full shadow-xl"
                    src={src}

                  />

                )}

              </Slider>

            </div>
            <div className="w-3/4 md:px-20 md:py-0 py-10">
              <h2 className="text-2xl font-semibold mt-5 text-gray-700">
                {Details.title}
              </h2>
              <span className="text-lg font-bold text-green-600 ">
                ${Details.price}
              </span>
              <p className="text-md mt-2 text-gray-400">
                {Details.category?.name}
              </p>
              <p className="text-md mt-2 text-[#2E4772]">{Details.description}</p>

              <div className="mt-5">
                {Loading ? (
                  <button className="text-white w-1/2 bg-[#2E4772] rounded-[50px] py-1 text-center">
                    <span className={style.loader}></span>
                  </button>
                ) : (
                  <Link to="/cart">
                    <button  className="text-white w-1/2 bg-[#2E4772] rounded-[20px] text-xl py-2 capitalize">
                      Add to Cart
                    </button>
                  </Link>

                )}
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Related Products Swiper */}
      {Related.length > 0 && (
        <div className="py-24">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Related Products
          </h1>
          <div className="swiper-wrapper">
            <Swiper
              ref={swiperRef}
              effect={"coverflow"}
              grabCursor={true}
              loop={true}
              slidesPerView={Math.min(4, Related.length)} // Ensures proper slide count
              centeredSlides={true} // Centers the active slide
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              coverflowEffect={{
                slideShadows: false,
                rotate: 5, // Adds a slight rotation for better visual separation
                stretch: 20, // Increases space between slides
                depth: 80, // Lowers depth effect
                modifier: 1.5, // Softens the transition
              }}
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              className="swiper-container mx-auto container px-4"
            >
              {Related.map((product) => (
                <SwiperSlide key={product._id} className="px-2">
                  <div className="text-center py-2 border rounded-lg shadow-md bg-white">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                    <h3 className="mt-2 text-lg font-bold text-gray-700">{product.title}</h3>
                    <p className="text-gray-500">{product.category?.name}</p>
                    <span className="text-green-600 font-semibold">${product.price}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>
      )}
    </>


  );
}
