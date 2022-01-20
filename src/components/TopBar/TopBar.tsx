import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.scss';


const TopBar: FC<{ val: string, fun: Function }> = ({ val, fun }) => {
  return (
    <>
      <header>
        <span className="title">The Movie Catalog</span>
        <Link to="/about">
          <div className="header-about">About</div>
        </Link>
      </header>
      <div className="search-bar">
        <div className="search-container">
          <input
            title="Search"
            value={val}
            onChange={(evt) => fun(evt.target.value)}
            placeholder="Search for movies"
          ></input>
        </div>
      </div></>
  );
}

export default TopBar;