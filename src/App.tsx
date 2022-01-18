import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { MovieInfo, QueryResponse } from './components/Interfaces';
import MovieCard from './components/Card/Card';
import './App.scss';


const apiUrl: string = 'https://api.themoviedb.org/3/search/';
const apiKey: string = '35d931152f774fb93f373fccb8ae76e9';

const fetchMovieList = async (query: string, callback: Function) => {
  if (query.trim().length === 0) {
    callback([]);
    return;
  }

  fetch(apiUrl + 'movie?api_key=' + apiKey + '&query=' + encodeURI(query))
    .then((response: Response) => {
      if (response.ok) return response.json()
      else throw new Error("Response returned " + response.status);
    })
    .then((response: QueryResponse) => response.results)
    .then((list: MovieInfo[]) => callback(list))
    .catch((error: Error) => {
      alert(error);
      return
    })
};

const debouncedFetch = debounce((query: string, callback: Function) => { fetchMovieList(query, callback); }, 300);

function App() {

  const [movies, setMovies] = useState<MovieInfo[]>([]);
  const [searchTerm, updateSearch] = useState<string>('');


  useEffect(() => {
    debouncedFetch(searchTerm, (list: MovieInfo[]) => {
      setMovies(() => []);
      console.log(list);
      list.map(movie => setMovies(arr => [...arr, movie]))
    })
  }, [searchTerm]);

  return (
    <div className="App">
      <input className="input" value={searchTerm} onChange={(evt) => updateSearch(evt.target.value)}></input>
      <div className="cards-container">
        {movies.map((item: MovieInfo, index: number) => {
          return <MovieCard key={index} info={item} />
        })}
      </div>
    </div>
  );
}

export default App;
