import  { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios';


export default function GetAllOrder() {
    let { decToken } = useContext(UserContext)
    let [allorders, setAllOrder] = useState([]);



    async function getAllOrder(decToken) {
        let id = decToken();
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            setAllOrder(data);
            console.log(data);

        }

        catch (error) {
            return error

        }


    }
    useEffect(() => {
        getAllOrder(decToken)
    }, [])


    return (
        <div>GetAllOrder</div>
    )
}
