import React, { FC } from "react";
import { GenreInfo, MovieInfo } from "../Interfaces";
import './Details.scss';
import close_img from '../../assets/close_x.png';


const DetailsBox: FC<{
  info: MovieInfo,
  reference: React.RefObject<HTMLDivElement>,
  toggleFunction: Function,
  genreList: GenreInfo[]
}> = ({ info, reference, toggleFunction, genreList }) => {
  return (
    <div id="details-container" >
      <div
        id="details-box"
        ref={reference}
        style={{ backgroundImage: info.backdrop_path === null ? "none" : "url(https://image.tmdb.org/t/p/w500" + info.backdrop_path + ")" }}
      >
        <div className="details-header">
          <div className="details-title">{info.title}</div>
          <div className="details-close" onClick={() => toggleFunction(info)}><img src={close_img} alt="close" /></div>
        </div>
        <div className="details-overview">
          <p>{info.overview}</p>
          <h4>Release date: {info.release_date}</h4>
          <h4>Rating: {info.vote_average} / 10 ({info.vote_count} votes)</h4>
          <h4>Genre(s): {
            info.genre_ids.map((id: number, index: number) => {
              if(genreList === undefined || genreList == null) return <>gecisfasz</>;
              const res = genreList.find(g => g.id === id);
              if (res !== undefined) 
                return <span key={index}>{res.name + (index === info.genre_ids.length -1 ? "" : ",")} </span>;
              else return <></>;
            })
          }</h4>
          <h4>Original title: {info.original_title}</h4>
        </div>
      </div>
    </div>
  );
}

export default DetailsBox;