import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'
function HomePage() {
    const [filmData, setFilmData] = useState([]);
    const [actorData, setActorData] = useState([]);
    const [filmDetailData, setFilmDetailData] = useState([]);
    const [actorDetailData, setActorDetailData] = useState([]);
    
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
        setFilmDetailData(film);
        console.log(filmDetailData)
    }

    const getActorDetails = (actor) => {
        axios.post('http://localhost:8384/actordetail', {id: actor.actor_id})
        .then((response) => {
            setActorDetailData(response.data)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
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
            <h1>Film Details</h1>
            { filmDetailData !== null && (
                Object.entries(filmDetailData).map(([key, value]) => (
                
                <p>
                    {key}: {value}
                </p>
                ))
            )}
        </div>
        
        <h2>Top Five Actors</h2>
        <div>
        <ul>
          {actorData.map((actor, index) => (
            <li 
            className="list-group-item"
            key={index}
            onClick={() => getActorDetails(actor)}
            >
                {actor.first_name} {actor.last_name}
            </li>
          ))}
        </ul>
        </div>

        <div>
            <h1>Actor Details</h1>
            { actorDetailData !== null && (
                Object.entries(actorDetailData).map(([key, value]) => (
                <p>
                    {key}: {value}
                </p>
                ))
            )}
        </div>

    </div>

    


  );
}

export default HomePage;
