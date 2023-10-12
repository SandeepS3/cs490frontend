import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'
import Popup from '../components/Popup'

function Movies() {
    const [movieData, setMovieData] = useState([]);

    const [inputMName, setMNameValue] = useState('');
    const handleMNameInputChange = (event) => {
        setMNameValue(event.target.value);
    };

    const [inputAName, setANameValue] = useState('');
    const handleANameInputChange = (event) => {
        setANameValue(event.target.value);
    };

    const [inputGenre, setGenreValue] = useState('');
    const handleGenreInputChange = (event) => {
        setGenreValue(event.target.value);
    };

    const [inputCustomerID, setCustomerID] = useState('');
    const handleCustomerIDChange = (event) => {
        setCustomerID(event.target.value);
    };

    function handleInput(inVal) {
        if (inVal === "Actor"){
            axios.post('http://localhost:8384/actornamemovie', {actorname: inputAName})
            .then((response) => {
                setMovieData(response.data)

            })
            .catch((err) => {
                console.log(err)
            });
        }

        if (inVal === "Movie"){
            axios.post('http://localhost:8384/movienamemovie', {moviename: inputMName})
            .then((response) => {
                setMovieData(response.data)

            })
            .catch((err) => {
                console.log(err)
            });
        }

        if (inVal === "Genre"){
            axios.post('http://localhost:8384/genremovie', {genre: inputGenre})
            .then((response) => {
                setMovieData(response.data)

            })
            .catch((err) => {
                console.log(err)
            });
        }
    }

    const [buttonPopup, setButtonPopup] = useState(false);
    const [movieDetailData, setMovieDetailData] = useState([]);
    const GetMovieDetail = (movie) => {
        axios.post('http://localhost:8384/moviedetail', {film: movie.title})
        .then((response) => {
            setMovieDetailData(response.data)
            setButtonPopup(true)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const rentfilm = (inputCustomerID, movieDetailData) => {
        console.log(inputCustomerID)
        const filmid = movieDetailData[0].film_id
        axios.post('http://localhost:8384/rentmovie', {customerid: inputCustomerID, movieid: filmid})
        .then((response) => {
            setMovieDetailData(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
        setButtonPopup(false)
    }

    return (
        <div>
            <NavBar />
            <h1>Movies Page</h1>

            <label htmlFor="actorNameInput">Enter Actor Name:</label>
            <input
                type="text"
                id="actorNameInput"
                value={inputAName}
                onChange={handleANameInputChange}
            />
            <button onClick={() => handleInput("Actor")}>Search</button>


            <label htmlFor="movieNameInput">Enter Movie Name:</label>
            <input
                type="text"
                id="movieNameInput"
                value={inputMName}
                onChange={handleMNameInputChange}
            />
            <button onClick={() => handleInput("Movie")}>Search</button>


            <label htmlFor="genreInput">Enter Genre:</label>
            <input
                type="text"
                id="genreInput"
                value={inputGenre}
                onChange={handleGenreInputChange}
            />
            <button onClick={() => handleInput("Genre")}>Search</button>



            <h2>Movies</h2>
            <ul>
                {movieData.map((movie, index) => (
                    <li 
                    className="list-group-item"
                    key={index}
                    onClick={() => GetMovieDetail(movie)}
                    >
                        {movie.title}
                    </li>
                ))}
            </ul>
            

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

            <ul>
          {movieDetailData.map((movie, index) => (
                Object.entries(movie).map(([key, value]) => (
                    <p>
                        {key}: {value}
                    </p>
                    ))
          ))}
            </ul>
            
            <br></br>
            <h6>Rent Film to Customer ID: </h6>
            
            <label htmlFor="customerID">Customer ID:</label>
            <input
                type="number"
                id="customerID"
                value={inputCustomerID}
                onChange={handleCustomerIDChange}
            />
            <button onClick={() => rentfilm(inputCustomerID, movieDetailData)}>Submit</button>
            </Popup>
        </div>
        
    );
}

export default Movies