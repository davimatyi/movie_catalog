export interface MovieInfo {
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
  vote_average: number,
  vote_count: number
}

export const EmptyMovieInfo: MovieInfo = {
  adult: false,
  backdrop_path: '',
  genre_ids: [],
  id: 0,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0
}

export interface QueryResponse {
  page: number,
  results: MovieInfo[],
  total_pages: number,
  total_results: number
}

export interface MovieInterface {
  info: MovieInfo
}

export interface PosterInterface {
  path: string,
  fallback: string
}