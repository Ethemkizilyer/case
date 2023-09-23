import { TMDB_URL, options } from './config'

export const getMainMovie = async (id)=> {
  try {
    const movie= await fetch(`${TMDB_URL}/movie/${id}?language=en-US`, options)
    const response = await movie.json()

    return response
  } catch (error) {
    if (error instanceof Error) throw `Error getting main movie ${error}`
  }
}

export const getMovieById = async (id) => {
  try {
    const movie =await fetch(`${TMDB_URL}/movie/${id}?language=en-US`, options)
    const response = await movie.json()

    return response
  } catch (error) {
    if (error instanceof Error) throw `Error getting movie by id ${error}`
  }
}

export const getMovies = async () => {
  try {
    const movie = await fetch(`${TMDB_URL}/movie/popular?language=en-US`, options)
    const response = await movie.json()

    return response.results.map((movie) => movie)
  } catch (error) {
    if (error instanceof Error) throw `Error getting all movies ${error}`
  }
}

export const getTvShows = async () => {
  try {
    const shows = await fetch(`${TMDB_URL}/tv/popular?language=en-US`, options)
    const response =shows.json()

    return response.results.map((tvShow) => tvShow)
  } catch (error) {
    if (error instanceof Error) throw `Error getting tv shows ${error}`
  }
}

export const getTvShowById = async (id)=> {
  try {
    const show = await fetch(`${TMDB_URL}/tv/${id}?language=en-US`, options)
    const response = await show.json()

    return response
  } catch (error) {
    if (error instanceof Error) throw `Error getting tv show by id ${error}`
  }
}

export const getGenres = async ()=> {
  try {
    const response = await fetch(`${TMDB_URL}/genre/movie/list`, options)
    const { genres } = await response.json()

    return genres
  } catch (error) {
    if (error instanceof Error) throw `Error getting tv show by id ${error}`
  }
}
