/* eslint-disable */

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GetAllUser() {
    const [users, setUsers] = useState([]);

    async function getAllUsers() {
        try {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/users`,
                { params: { limit: 10, keyword: "a" } }
            );
    
            console.log("Full API Response:", response); 
            console.log("Data inside API Response:", response.data); 
    
    
            setUsers(response.data.data || []);  
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {Array.isArray(users) ? (
                    users.map((user) => <li key={user._id}>{user.name}</li>)
                ) : (
                    <li>No users found</li>
                )}
            </ul>
        </div>
    );
}
