import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'
import Popup from '../components/Popup'


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


    const [buttonPopup, setButtonPopup] = useState(false);
    const [customerDetailData, setCustomerDetailData] = useState([]);
    const GetCustomerDetail = (customer) => {
        setCustomerDetailData(customer)
        setButtonPopup(true)
    }

    const [isFormVisible, setFormVisible] = useState(false);
    const handleFormToggle = () => {
      setFormVisible(!isFormVisible);
    };

    

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [addressID, setAddressID] = useState("")
    
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8384/addcustomer', {firstname: fName, lastname: lName, email: email, addressid: addressID})
        .then((response) => {
            alert(response.data)
            setFormVisible(false)
        })
        .catch((err) => {
            console.log(err)
        });
    }


    const [deleteID, setDeleteID] = useState('');
    const handleDeleteIDChange = (event) => {
        setDeleteID(event.target.value);
    };
    const deleteCustomer = () => {
        axios.post('http://localhost:8384/deletecustomer', {customerid: deleteID})
        .then((response) => {
            alert(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    return (
        <div>
            <NavBar />
            <h1>Customers Page</h1>
            <button onClick={handleFormToggle}>Add Customer</button>
            <br /> <br />
            <label htmlFor="deleteID">Enter ID to Delete:</label>
            <input
                type="number"
                id="deleteID"
                value={deleteID}
                onChange={handleDeleteIDChange}
            />
            <button onClick={() => deleteCustomer()}>Delete Customer</button>


            {isFormVisible && (
        <div className="form-popup">
          <div className="form-container">
            <h2>Add Customer</h2>
            <form onSubmit={handleSubmit}>
              <input 
                    type="text"
                    value = {fName}
                    onChange={ (e) => setFName(e.target.value)}
                    placeholder="first name" required/>
              <br />
              <input 
                    type="text"
                    value = {lName}
                    onChange={ (e) => setLName(e.target.value)} 
                    placeholder="last name" required/>
              <br />
              <input 
                    type="email"
                    value = {email} 
                    onChange={ (e) => setEmail(e.target.value)}
                    placeholder="email" required/>
              <br />
              <input 
                    type="number" 
                    value = {addressID}
                    onChange={ (e) => setAddressID(e.target.value)}
                    placeholder="address id" required/>
              <br />
              <br />
              <button type="submit">Submit</button>
            </form>
            <button onClick={handleFormToggle}>Close</button>
          </div>
        </div>
        )}

            <br></br> <br></br>
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
                    onClick={() => {GetCustomerDetail(customer)}}
                    >
                        {customer.first_name} {customer.last_name}
                    </li>
                ))}
            </ul>
            </div>
            
            {customerDetailData.length !== 0 ? (
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <ul>

                {Object.entries(customerDetailData).map(([key, value]) => (
                    <p>
                        {key}: {value}
                    </p>
                    ))}

            </ul>
            </Popup> ) : null
        }
        </div>
    )
}

export default Customers