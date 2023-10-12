import NavBar from '../components/NavBar'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function Reports() {
    const [rentalInfo, setRentalInfo] = useState()
    const generatePDF = () => {
        axios.get('http://localhost:8384/rentedfilms')
        .then((response) => {
            setRentalInfo(response.data)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
        const doc = new jsPDF();
        rentalInfo.forEach((data, index) => {
            if (index > 0) {
              doc.addPage();
            }
            const content = JSON.stringify(data, null, 4);
            doc.text(content, 5, 5);
          });
        doc.save('customerrentalinfo.pdf');
    }
    return (
        <div>
            <NavBar />
            <h1>Reports Page</h1>

             <button onClick={generatePDF}>Generate PDF</button>



        </div>
    )
}

export default Reports