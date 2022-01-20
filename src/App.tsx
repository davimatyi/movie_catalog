import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { EmptyMovieInfo, MovieInfo, QueryResponse } from './components/Interfaces';
import MovieCard from './components/Card/Card';
import TopBar from './components/TopBar/TopBar';
import './App.scss';
import DetailsBox from './components/Details/Details';


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
  const [detailsShown, setShowDetails] = useState<boolean>(false);
  const [detailsInfo, setDetailsInfo] = useState<MovieInfo>(EmptyMovieInfo);

  const alignerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const showHideDetails = (info: MovieInfo) => {
    if (detailsShown) {
      if (info === detailsInfo) {
        setShowDetails(false);
        setTimeout(() => {
          if (alignerRef.current !== null)
            alignerRef.current.style.width = '30%';
        }, 400);
        if (detailsRef.current !== null) {
          detailsRef.current.style.opacity = '0';
        }

      }
      else {
        if (detailsRef.current !== null) {
          detailsRef.current.style.opacity = '0';
          setTimeout(() => {
            setDetailsInfo(info);
            if (detailsRef.current !== null)
              detailsRef.current.style.opacity = '1';
          }, 300);
        }
      }
    } else {
      setDetailsInfo(info);
      setShowDetails(true);
      if (alignerRef.current !== null)
        alignerRef.current.style.width = '0%';
      setTimeout(() => {
        if (detailsRef.current !== null)
          detailsRef.current.style.opacity = '1';
      }, 400);
    }
  }



  useEffect(() => {
    debouncedFetch(searchTerm, (list: MovieInfo[]) => {
      setMovies(() => []);
      console.log(list);
      list.map(movie => setMovies(arr => [...arr, movie]))
    })
  }, [searchTerm]);

  return (
    <div className="App">
      <TopBar val={searchTerm} fun={updateSearch} />
      <main>
        <div ref={alignerRef} className="cards-aligner"></div>
        <div className="cards-container">
          {movies.map((item: MovieInfo, index: number) => {
            return <MovieCard key={index} info={item} onClick={showHideDetails} />
          })}
        </div>
        <DetailsBox info={detailsInfo} reference={detailsRef} toggleFunction={showHideDetails} />
      </main>
    </div>
  );
}

export default App;
