import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

type movieInfo = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number
  vote_count: number,
}

type queryResponse = {
  page: number,
  results: movieInfo[],
  total_pages: number,
  total_results: number
}

const apiKey: string = '35d931152f774fb93f373fccb8ae76e9'

const fetchMovieList = async (query: string, callback: Function) => {
  if (query.trim().length === 0) {
    callback([]);
    return;
  }

  fetch('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + encodeURI(query))
    .then((response: Response) => {
      if(response.ok) return response.json()
      else throw new Error("Response returned "+response.status);
    })
    .then((response: queryResponse) => response.results)
    .then((list: movieInfo[]) => callback(list))
    .catch((error: Error) => {
      alert(error);
      return
    })
  // console.log('update ' + search);
};

const debouncedFetch = debounce((query: string, callback: Function) => {fetchMovieList(query, callback);}, 500);

function App() {

  const [movies, setMovies] = useState<movieInfo[]>([]);
  const [searchTerm, updateSearch] = useState<string>('');


  useEffect(() => {
    debouncedFetch(searchTerm, (list: movieInfo[]) => {
      setMovies(() => []);
      console.log(list);
      list.map(movie => setMovies(arr => [...arr, movie]))
    })
  }, [searchTerm]);

  return (
    <div className="App">
      <input className="input" value={searchTerm} onChange={(evt) => updateSearch(evt.target.value)}></input>
      <div className="cards-container">
        {movies.map((item: movieInfo, index: number) => {
          return <div key={index}>{item.title}<br /></div>
        })}
      </div>
    </div>
  );
}

export default App;
