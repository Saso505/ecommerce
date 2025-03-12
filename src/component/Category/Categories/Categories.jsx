import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState(null);



    // Fetch all categories
    async function fetchCategories() {
        try {
            const response = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/categories"
            );
            setCategories(response.data.data);

        } catch (error) {
            return error;
        }
    }

    // Fetch subcategories for a given category
    async function fetchSubcategories(id) {
        try {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories/${id}`
            );
            setSubcategories(response.data.data);

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
        <div className="container mx-auto py-20 px-10">
            <span className="text-sm font-semibold text-center header  relative text-[#DB4444] mb-6 mx-4  px-2">
                Categories
            </span>

            <h2 className="text-3xl   font-bold text-black mb-6 py-5 mx-2 ">
                Browse By Category
            </h2>

            <Slider {...settings}>
                {categories.map((item) => (
                    <div
                        key={item._id}
                        className="p-4 cursor-pointer"
                        onClick={() => fetchSubcategories(item._id)}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-60 object-cover rounded-md shadow-md"
                        />
                        <h2 className="mt-2 text-lg font-semibold  text-center">{item.name}</h2>
                    </div>
                ))}
            </Slider>

            {/* Subcategory Popup */}
            {subcategories && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center"
                    onClick={() => setSubcategories(null)}
                >
                    <div
                        className="bg-white/20 p-6 rounded-lg shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-300 font-bold text-xl "
                            onClick={() => setSubcategories(null)}
                        >
                            x
                        </button>
                        <img
                            src={subcategories.image}
                            alt={subcategories.name}
                            className="w-60 h-60 rounded-md shadow-xl mx-auto"
                        />
                        <p className="text-xl font-semibold text-gray-200 text-center mt-4">
                            {subcategories.name}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
