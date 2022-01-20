import React, { FC } from "react";
import { MovieInfo } from "../Interfaces";
import './Details.scss';
import close_img from '../../assets/close_x.png';


const DetailsBox: FC<{ 
  info: MovieInfo, 
  reference: React.RefObject<HTMLDivElement>,
  toggleFunction: Function
}> = ({ info, reference, toggleFunction }) => {
  return (
    <div id="details-container" >
      <div 
        id="details-box" 
        ref={reference} 
        style={{backgroundImage: info.backdrop_path === null ? "none" : "url(https://image.tmdb.org/t/p/w500"+info.backdrop_path+")"}}
      >
        <div className="details-header">
          <div className="details-title">{info.title}</div>
          <div className="details-close" onClick={() => toggleFunction(info)}><img src={close_img} alt="close" /></div>
        </div>
        <div className="details-overview">{info.overview}</div>
      </div>
    </div>
  );
}

export default DetailsBox;