import { ref } from 'vue'
import { getMovies, getTvShows, getMovieById, getTvShowById, getGenres } from '../services/api'




const useMovies = () => {
  const movies = ref([])
  const tvShows = ref([])
  const tvShow = ref()
  const mainMovie = ref()
  const movieById = ref()
  const loading = ref(false)
  const error = ref(false)
  const genres = ref([])
  const filteredMovies = ref()

  const getMoviesList = async () => {
    try {
      loading.value = true
      movies.value = await getMovies()
      return movies.value
    } catch (err) {
      console.error(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const getTvShowList = async () => {
    tvShows.value = await getTvShows()
  }

  const getTvShowByIdData = async (id) => {
    tvShow.value = await getTvShowById(id)
  }

  // const getRandomMovie = async (movies) => {
  //   if (movies.value) {
  //     const randomMovie = Math.floor(Math.random() * movies.value.length)
  //     const movieById = movies.value[randomMovie].id
  //     mainMovie.value = await getMainMovie(movieById)
  //   }
  // }

  const getMovieByIdData = async (id) => {
    try {
      loading.value = true
      movieById.value = await getMovieById(id)
    } catch (err) {
      console.error(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const getGenresList = async () => {
    return await getGenres()
  }

  const filterMovies = (input, type) => {
    if (type === 'name' && typeof input === 'string') {
      if (input && filteredMovies.value?.length) {
        filteredMovies.value = filteredMovies.value.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()))
        return filteredMovies.value
      }
      filteredMovies.value = movies.value?.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()))
      return filteredMovies.value
    } else {
      if (!input) return movies.value
      filteredMovies.value = movies.value?.filter((movie) => movie.genres?.includes(Number(input)))
      return filteredMovies.value
    }
  }

  return {
    movies,
    tvShows,
    mainMovie,
    movieById,
    tvShow,
    loading,
    error,
    genres,
    getMoviesList,
    getTvShowList,
    getTvShowByIdData,
    // getRandomMovie,
    getMovieByIdData,
    filterMovies,
    getGenresList,
  }
}

export default useMovies
