import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useMovieStore = defineStore('movie', {
  state: () => ({
    baseUrl:
      'https://api.themoviedb.org/3/movie/now_playing?api_key=d37aa81d99fd5b49201922d61ad5b2fd&language=en-US&page=',
    searchUrl:
      'https://api.themoviedb.org/3/search/movie?api_key=d37aa81d99fd5b49201922d61ad5b2fd&query=',
    movieSearchResult: [],
    moviesResult: [],
    currentPage: 1,
    totalPage: 1,
    currentPageSearch: 1,
    totalPageSearch: 1,
    movieDetail: {},
    favorites: []
  }),

  actions: {
    loadFavorites(){
      if(localStorage.getItem("movies")){
        this.favorites=JSON.parse(localStorage.getItem("movies"))
      }
    },
    swalSuccess(title, message) {
      Swal.fire(title, message, 'success')
    },
    swalError(title, message) {
      Swal.fire(title, message, 'error')
    },
    swalErrorNotification(error) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: error.response.statusText
      })
    },
    swalNotification(title) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title
      })
    },
    async searchMovie(value) {
      try {
        let { data } = await axios({
          method: 'get',
          url: `${this.searchUrl}${value.name}&page=${value.page}`
        })
        this.movieSearchResult = data.results
        console.log(data)
        this.totalPageSearch = data.total_pages
        this.currentPageSearch = data.page
      } catch (error) {
        console.log(error)
      }
    },

    async fetchMovies(page = 1) {
      try {
        let { data } = await axios({
          method: 'get',
          url: this.baseUrl + page
        })
        // this.loadFavorites()
        console.log(data)
        this.moviesResult = data.results
        this.totalPage = data.total_pages
        this.currentPage = data.page
        this.swalNotification('Movies has loaded')
      } catch (error) {
        console.log(error)
        this.swalError('Movies failed to be loaded', 'Movies failed to be loaded')
      }
    },
    async fetchMovieDetail(id) {
      try {
        let { data } = await axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${id}?api_key=d37aa81d99fd5b49201922d61ad5b2fd`
        })

        console.log(data)
        this.movieDetail = data

        this.swalNotification('Movies has loaded')
      } catch (error) {
        console.log(error)
        this.swalError('Movies failed to be loaded', 'Movies failed to be loaded')
      }
    },
    async handleMovie(movie) {
      if (this.isSaved(movie)) {
        this.favorites = this.favorites.filter((favorite) => favorite.id !== movie.id)
        this.handleStorage(true)
        return
      }
      this.favorites = [...this.favorites, movie]
      this.handleStorage(true)
      return this.favorites
    },
    async handleMovieRemove(movie) {
      this.favorites = this.favorites.filter((favorite) => favorite.id !== movie.id)
      this.handleStorage(true)
      return
    },
    isSaved(movie) {
      const isSaved = this.favorites.some((favorite) => favorite.id === movie.id)
      return isSaved
    },
    handleStorage(saved) {
      if (saved) localStorage.setItem('movies', JSON.stringify(this.favorites))

      if (localStorage.getItem('movies')) {
        this.favorites = JSON.parse(localStorage.getItem('movies'))
      }
    }
  }
})
