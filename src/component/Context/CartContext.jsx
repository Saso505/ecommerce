/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create Cart Context
export const CartContext = createContext();


export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [Id, setId] = useState(null);

    console.log('Cart id', Id);

    const [Loading, setLoading] = useState(false);


    const token = localStorage.getItem("userToken");

    function reset (){
        setId(null);
        setCartItems([]);
    }

    async function addProductCart(productId) {
        try {
            setLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                { headers: { token } }
            );
            console.log(data);
            setCartItems(data);
            setId(data.cartId);

            toast.success(data.message, {
                duration: 500,

            })

            setLoading(false)
            return data;
        } catch (error) {
            console.error("Error adding product to cart:", error);

            toast.error("Failed to add product to cart", {
                duration: 500,
            })
            setLoading(false)
            return error;

        }
    }

    async function getProductCart(productId) {
        try {
            setLoading(true);
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/cart",

                { headers: { token } }
            );
            console.log(data);
            setCartItems(data);
            setId(data.cartId);
            setLoading(false)
            return data;
        } catch (error) {

            setLoading(false)

            return error;
        }
    }



    async function updateProductCart(productId, count) {
       if(count>0){
        try {
            setLoading(true);
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                { headers: { token } }
            );
            console.log(data);
            setCartItems(data);
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

        else{
            deleteProductCart(productId);
        }

    }
    async function deleteProductCart(productId) {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
               
                { headers: { token } }
            );
            console.log(data);
            setCartItems(data);
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


    async function clearProductCart() {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                "https://ecommerce.routemisr.com/api/v1/cart",

                { headers: { token } }
            );
          
            setCartItems(data);

            setLoading(false)
            return data;
        } catch (error) {

            setLoading(false)

            return error;
        }
    }
    useEffect(() => {
        setCartItems();
    }, [] )

    return (
        <CartContext.Provider value={{Loading,reset, clearProductCart,addProductCart, getProductCart, cartItems, setCartItems, updateProductCart ,deleteProductCart,Id}}>
            {children}
        </CartContext.Provider>
    );
}
