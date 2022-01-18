import React, { FC } from "react";
import { MovieInterface, PosterInterface } from '../Interfaces';
import poster_fallback from '../../assets/poster_fallback.jpg';
import './Card.scss';

const imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500/';

const Poster: FC<PosterInterface> = ({ path, fallback }) => {
  if (path == null) {
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

const RatingBar: FC<{ avg: number }> = ({ avg }) => {
  return (
    <div className="ratings">
      <div className="rating-box">
        <div className="rating-bar" style={{width: avg * 10 + "px"}}></div>
      </div>
      <div className="rating-text">
        {avg} / 10
      </div>
    </div>
  );
}

const MovieCard: FC<MovieInterface> = ({ info }) => {
  return (
    <div className="card">
      <div className="card-left">
        <Poster path={info.poster_path} fallback={poster_fallback} />
      </div>
      <div className="card-right">
        <div className="card-title">{info.title}</div>
        <div className="card-date">{info.release_date}</div>
        <RatingBar avg={info.vote_average} />
      </div>
      <div className="card-footer">

      </div>
    </div>
  );
}

export default MovieCard