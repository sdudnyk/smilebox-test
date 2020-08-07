import React  from 'react';
import { Link } from "react-router-dom";

function MovieLink ({title, id, image}) {
  return (
    <Link to={`/${id}`} className='movie-results__link'>
      <img
        src={image !== 'N/A' ? image : '/no-poster.jpg'}
        alt={`${title} poster`}
        className='movie-results__link-image'
      />
      <h3 className='movie-results__link-title'>{title}</h3>
    </Link>
  )
}

export default MovieLink;
