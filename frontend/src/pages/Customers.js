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


    const [inputName, setNameValue] = useState('');
    const handleNameInputChange = (event) => {
        setNameValue(event.target.value);
    };

    const [inputID, setID] = useState('');
    const handleIDInputChange = (event) => {
        setID(event.target.value);
    };
    
    function handleClick(isName) {
        if (isName) {
            axios.post('http://localhost:8384/customername', {name: inputName})
            .then((response) => {
                setCustomerData(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
        }
        else {
            axios.post('http://localhost:8384/customerid', {id: inputID})
            .then((response) => {
                setCustomerData(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
        }

    }

    const [customerDetailData, setCustomerDetailData] = useState([]);
    const GetCustomerDetail = async (customer) => {
        setCustomerDetailData(customer);
        console.log(customerDetailData)
    }

    return (
        <div>
            <NavBar />
            <h1>Customers Page</h1>
            <label htmlFor="myNameInput">Enter Name:</label>
            <input
                type="text"
                id="myInput"
                value={inputName}
                onChange={handleNameInputChange}
            />
            <button onClick={() => handleClick(true)}>Search</button>

            <label htmlFor="myIDInput">Enter ID:</label>
            <input
                type="text"
                id="myIDInput"
                value={inputID}
                onChange={handleIDInputChange}
            />
            <button onClick={() => handleClick(false)}>Search</button>
            <div>
            <h2>Customers</h2>
            <ul>
                {customerData.map((customer, index) => (
                    <li 
                    className="list-group-item"
                    key={index}
                    onClick={() => GetCustomerDetail(customer)}
                    >
                        {customer.first_name} {customer.last_name}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Customers