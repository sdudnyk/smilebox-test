import React, {useState} from "react";
import API from "../utils/api";
import consts from "../utils/consts";
import MovieLink from "./MovieLink";
import "../styles/home.scss"

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorValue, setErrorValue] = useState("");

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      setErrorValue('');
      API.get(`/?apikey=${consts.API_KEY}&s=${searchValue}`)
        .then((results) => {
          if(!results.data.Error) {
            setSearchResults(results.data.Search);
          } else {
            setErrorValue(results.data.Error);
          }
        })
        .catch(() => {
          setErrorValue('Oops, something went wrong. Please try again.');
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <h1 className="search-form__title">Search movies from OMDb:</h1>
        <input
          type="text"
          placeholder="Movie Name"
          value={searchValue}
          onChange={handleSearchChange}
          className="search-form__input"
        />
        <button type='submit' className="search-form__submit">Search</button>
      </form>

      <div className="movie-results">
        {errorValue ?
          <p className="movie-results__error">
            {errorValue}
          </p>
          :
          <ul className="movie-results__list">
            {searchResults.map(item => (
              <li key={item.imdbID} className="movie-results__list-item">
                <MovieLink title={item.Title} id={item.imdbID} image={item.Poster}/>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Home;
