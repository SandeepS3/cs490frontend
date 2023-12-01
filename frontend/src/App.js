import React from 'react';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} /> 
                    <Route path="/home" element={<HomePage />} /> 
                    <Route path="/movies" element={<Movies />} /> 
                    <Route path="/customers" element={<Customers />} /> 
                    <Route path="/reports" element={<Reports />} /> 
                </Routes>
            </BrowserRouter>
        </div>
    )

}
export default App;