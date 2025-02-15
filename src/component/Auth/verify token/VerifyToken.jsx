import axios from 'axios'
import React, { useEffect } from 'react'



export default function VerifyToken() {
    async function verifyToken() {
        try {

            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
                headers: {
                    token: localStorage.getItem('userToken'),
                },

            })

            console.log(response.data)


        }

        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        verifyToken();
    }, []);


    return (
        <div>VerifyToken</div>
    )
}
