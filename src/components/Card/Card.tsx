import React, { FC } from "react";
import { MovieInterface, PosterInterface } from '../Interfaces';
import poster_fallback from '../../assets/poster_fallback.jpg';
import './Card.scss';

const imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500/';

const Poster: FC<PosterInterface> = ({ path, fallback }): JSX.Element => {
  if(path == null) {
    return <img src={fallback} className="card-poster" alt="Poster" />
  } else {
    return <img src={imageBaseUrl + path} className="card-poster" alt="Poster"
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src = fallback;
    }}
  />
  }
}

const MovieCard: FC<MovieInterface> = ({ info }): JSX.Element => {
  return (
    <div className="card">
      <div className="card-left">
        <Poster path={info.poster_path} fallback={poster_fallback} />
      </div>
      <div className="card-right">
        <div className="card-title">
          {info.title}
        </div>
      </div>
      <div className="card-footer">

      </div>
    </div>
  );
}

export default MovieCard