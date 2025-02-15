import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Brand() {
  const [Brands, setBrands] = useState([]);
  const [subBrands, setSubBrands] = useState(null); // Set initial state to null

  // Fetch all categories
  async function fetchCategories() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data);

    } catch (error) {
      return error;
    }
  }

  // Fetch subcategories based on category ID
  async function fetchSubcategories(id) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setSubBrands(response.data.data);

    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Brands
      </h1>

      <Slider {...settings}>
        {Brands.map((item) => (
          <div
            key={item._id}
            className="p-4 cursor-pointer"
            onClick={() => fetchSubcategories(item._id)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md shadow-md"
            />
            <h2 className="mt-2 text-lg font-bold text-center">{item.name}</h2>
          </div>
        ))}
      </Slider>

      {/* Subcategory Popup */}
      {subBrands && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center"
          onClick={() => setSubBrands(null)}
        >
          <div
            className="bg-white/20 p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 right-0 text-gray-700 font-bold text-xl"
              onClick={() => setSubBrands(null)}
            >
              ✖
            </button>
            <img
              src={subBrands.image}
              alt={subBrands.name}
              className="w-60 h-60 rounded-md shadow-xl mx-auto"
            />
            <p className="text-xl font-semibold text-gray-200 text-center mt-4">
              {subBrands.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
