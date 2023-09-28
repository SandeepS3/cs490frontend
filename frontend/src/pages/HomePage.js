import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'
function HomePage() {
    const [filmData, setFilmData] = useState([]);
    const [isFilmLoading, setIsFilmLoading] = useState(true);
    const [actorData, setActorData] = useState([]);
    const [isActorLoading, setIsActorLoading] = useState(true);
    
    useEffect(() => {
        axios.get('http://localhost:8384/top5films')
        .then((response) => {
            setFilmData(response.data)
        })
        .catch((err) => {
            console.log(err)
        });

        axios.get('http://localhost:8384/top5actors')
        .then((response) => {
            setActorData(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])

    const GetFilmDetail = async (film) => {
        const sentfilm = await fetch('http://localhost:8384/film', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        })

        const filmsent = await sentfilm.json()
        console.log(filmsent)
    }

  return (
    <div>
        <div>
            <NavBar />
        </div>
        <h1>Home Page</h1>
        <div>
        <h2>Top Five Films</h2>
        <ul>
          {filmData.map((film, index) => (
            <li 
            className="list-group-item"
            key={index}
            onClick={() => GetFilmDetail(film)}
            >
                {film.FilmTitle}
            </li>
          ))}
        </ul>
        </div>
        
        <div>
        <ul>
          {actorData.map((actors, index) => (
            <li 
            className="list-group-item"
            key={index}
            >
                {actors.first_name} {actors.last_name}
            </li>
          ))}
        </ul>
        </div>
    </div>

    


  );
}

export default HomePage;