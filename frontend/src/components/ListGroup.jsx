import React, { useEffect, useState } from 'react';

function ListGroup() {
    function GetTop5Films() {
        const [filmData, setFilmData] = useState([]);
        const [isFilmLoading, setIsFilmLoading] = useState(true);
      
        useEffect(() => {
            
          fetch('http://localhost:8384/top5films')
            .then((response) => {
              return response.json();
            })
            .then((jsonData) => {
              setFilmData(jsonData);
              setIsFilmLoading(false);
            })
            .catch((error) => {
              console.error('Error Fetching:', error);
              setIsFilmLoading(false);
            });
        }, []);
        console.log(filmData)
        return filmData;
    }

    function GetTop5Actors() {
        const [actorData, setActorData] = useState([]);
        const [isActorLoading, setIsActorLoading] = useState(true);
      
        useEffect(() => {
            
          fetch('http://localhost:8384/top5actors')
            .then((response) => {
              return response.json();
            })
            .then((jsonData) => {
              setActorData(jsonData);
              setIsActorLoading(false);
            })
            .catch((error) => {
              console.error('Error Fetching:', error);
              setIsActorLoading(false);
            });
        }, []);
        console.log(actorData)
        return actorData;
    }

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

    const top5films = GetTop5Films();
    const top5actors = GetTop5Actors();
  return (
    <div>
        <h1>Home Page</h1>
        <div>
        <h2>Top Five Films</h2>
        <ul>
          {top5films.map((film, index) => (
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
          {top5actors.map((actors, index) => (
            <li 
            className="list-group-item"
            key={index}
            >
                {actors}
            </li>
          ))}
        </ul>
        </div>
    </div>

    


  );
}

export default ListGroup;
