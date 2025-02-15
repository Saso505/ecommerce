/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export const WishContext = createContext();


export function WishContextProvider({ children }) {
    const [Wishtems, setWishItems] = useState([]);


    const [Loading, setLoading] = useState(false);

    

    const token = localStorage.getItem("userToken");

    async function addProductWish(productId) {
        try {
            setLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId },
                { headers: { token } }
            );
            console.log(data);
            setWishItems(data);
            toast.success(data.message, {
                duration: 1000,

            })

            setLoading(false)
            return data;
        } catch (error) {
            console.error("Error adding product to cart:", error);

            toast.error("Failed to add product to cart", {
                duration: 1000,
            })
            setLoading(false)
            return error;

        }
    }

    async function getProductWish(productId) {
        try {
            setLoading(true);
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/wishlist",

                { headers: { token } }
            );
            console.log('get data', data);
            setWishItems(data);

            setLoading(false)
            return data;
        } catch (error) {

            setLoading(false)

            return error;
        }
    }




    async function deleteProductWish(productId) {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

                { headers: { token } }
            );
            console.log(data);
            setWishItems(data);
            toast.success(data.message, {
                duration: 500,
            })
            setLoading(false)
            return data;
        } catch (error) {
            setLoading(false)
            return error;
        }
    }

    useEffect(() => {
        setWishItems();
    }, [])

    return (
        <WishContext.Provider value={{ Loading, addProductWish, getProductWish, Wishtems, setWishItems, deleteProductWish }}>
            {children}
        </WishContext.Provider>
    );
}
