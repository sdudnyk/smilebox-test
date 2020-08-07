import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import API from "../utils/api";
import consts from "../utils/consts";
import '../styles/movie.scss'

function MoviePage () {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [errorValue, setErrorValue] = useState("");

  useEffect(() => {
    if(!movieData) {
      API.get(`/?apikey=${consts.API_KEY}&i=tt${id}`)
        .then((results) => {
          if(!results.data.Error) {
            setMovieData(results.data);
          } else {
            setErrorValue(results.data.Error);
          }
        })
        .catch(() => {
          setErrorValue('Oops, something went wrong. Please try again.');
        });
    }
  });

  return (
    <div className="container movie">
      <Link to="/">
        <span className="movie__back">← Back to search</span>
      </Link>
      {errorValue ?
          <p>
            {errorValue}
          </p>
        :
          (movieData &&
            <div className="movie__container">
              <img
                src={movieData.Poster !== 'N/A' ? movieData.Poster : '/no-poster.jpg'}
                alt={`${movieData.Title} poster`}
                className="movie__image"
              />
              <div className="movie__meta">
                <h1 className="movie__name">{movieData.Title}</h1>
                <p><span className="movie__meta-title">Year:</span> {movieData.Year}</p>
                <p><span className="movie__meta-title">Genre:</span> {movieData.Genre}</p>
                <p><span className="movie__meta-title">Actors:</span> {movieData.Actors}</p>
                <p><span className="movie__meta-title">Language:</span> {movieData.Language}</p>
                <p><span className="movie__meta-title">Runtime:</span> {movieData.Runtime}</p>
                <p><span className="movie__meta-title">IMDB Rating:</span> {movieData.imdbRating}</p>
                <p><span className="movie__meta-title">Plot:</span> {movieData.Plot}</p>
              </div>
            </div>
          )
        }
    </div>
  );
}

export default MoviePage;
