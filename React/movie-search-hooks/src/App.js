import React, { useState } from 'react';
import './App.css';

function App() {
    const [rows, setRows] = useState("");

    const performSearch = (searchTerm) => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=dda7a5fa0b27a5356fddd839e93b2467&query=${searchTerm}`
        fetch(url)
        .then(response =>{
            return response.json()
        })
        .then(searchResults => {
            let movies = searchResults.results;
            console.log(movies);
            
            let movieRows = [];
            movies.forEach((movie) => {
                const movieRow = <div key={movie.id}>
                                <img alt="poster" src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} />
                                {movie.title}
                                </div>
                movieRows.push(movieRow)
            })  
            setRows(movieRows)
        })
        .catch(error => {
            console.error('Error from API: ', error);     
        })
    }

    const searchChangeHandler = (event) => {
        performSearch(event.target.value);
    }

    return (
        <div>
            <h1>Movie Search</h1>
            <input
                id='inputField'
                onChange={searchChangeHandler}
                placeholder='Enter Movie Title'
            />
            {rows}
        </div>
    );
}

export default App;
