import React, { useEffect, useState } from 'react';

function ListGroup() {
    function GetTop5Films() {
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
      
        useEffect(() => {
          fetch('http://localhost:8384/t')
            .then((response) => {
              return response.json();
            })
            .then((jsonData) => {
              setData(jsonData);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error Fetching:', error);
              setIsLoading(false);
            });
        }, []);
        console.log(data)
        return data;
    }

    const top5films = GetTop5Films();
  return (
    <div>
        <h1>Top Five Films</h1>
        <ul>
          {top5films.map((film, index) => (
            <li key={index}>{film.FilmTitle}</li>
          ))}
        </ul>
    </div>
  );
}

export default ListGroup;
