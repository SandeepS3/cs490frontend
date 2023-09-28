import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'

function Customers() {
    const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8384/customers')
        .then((response) => {
            setCustomerData(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])


    return (
        <div>
            <NavBar />
            <h1>Customers Page</h1>
            <div>
            <h2>Customers</h2>
            <ul>
                {customerData.map((customer, index) => (
                    <li 
                    className="list-group-item"
                    key={index}
                    >
                        {customer.name}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Customers