<script>
import { RouterLink, RouterView } from "vue-router";
import { useMovieStore } from "../stores/movie";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      inputSearch: "",
      showSearch: false,
    };
  },
  methods: {
    toggleFavorite(movie) {
      // Burada favoriye ekleme veya kaldırma işlemini gerçekleştirin
      if (this.isFavorite(movie)) {
        // Favorilerden kaldırma işlemi
        this.removeFromFavorites(movie);
      } else {
        // Favorilere ekleme işlemi
        this.addToFavorites(movie);
      }
    },
    isFavorite(movie) {
      // Favoriye eklenip eklenmediğini kontrol etme işlemi
      return this.favorites.find((el) => el.id === movie.id);
    },
    addToFavorites(movie) {
      this.handleMovie(movie);
      // Favorilere ekleme işlemi
      // this.favorites.push(movie); // Favoriye ekleme işlemini uygun şekilde güncelleyin
    },
    removeFromFavorites(movie) {
      this.handleMovieRemove(movie);
      // Favorilerden kaldırma işlemi
      // this.favorites = this.favorites.filter((el) => el.id !== movie.id); // Favoriye kaldırma işlemini uygun şekilde güncelleyin
    },
    ...mapActions(useMovieStore, ["fetchMovies", "searchMovie","handleMovie","handleMovieRemove"]),
    addWwwToImageUrl(imageUrl) {
      if (imageUrl == null || imageUrl == undefined) {
        return "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png";
      } else {
        return `http://image.tmdb.org/t/p/w500${imageUrl}`;
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.fetchMovies(page);
    },
    getPageButtonClass(page) {
      return [
        "px-3 py-1 text-gray-600 font-medium rounded-md mx-1",
        { "bg-[#E50914] text-white": page === this.currentPage },
      ];
    },
    goToPageSearch(page) {
      console.log(page);
      this.currentPageSearch = page;
      console.log(this.currentPageSearch);
      let data = {
        name: this.inputSearch,
        page,
      };
      this.searchMovie(data);
    },
    goToFavorite(movie) {
      console.log(movie.adult);
      this.handleMovie(movie);
    },
    getPageButtonClassSearch(page) {
      return [
        "px-3 py-1 text-gray-600 font-medium rounded-md mx-1",
        { "bg-[#E50914] text-white": page === this.currentPage },
      ];
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    submitSearch() {
      let data = {
        name: this.inputSearch,
        page: this.currentPageSearch,
      };
      this.searchMovie(data);
      this.showSearch = true;
    },
  },
  computed: {
    ...mapState(useMovieStore, ["moviesResult", "movieSearchResult", "currentPage", "totalPageSearch", "totalPage", "currentPageSearch","favorites"]),
    totalPagesArr() {
      let pageNumbers = [];
      let pages;
      if (this.totalPage > 10) {
        pages = 10;
      } else {
        pages = this.totalPage;
      }
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
    totalPagesSearchArr() {
      let pageNumbers = [];
      let pages;
      if (this.totalPageSearch > 10) {
        pages = 10;
      } else {
        pages = this.totalPageSearch;
      }
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
  },
  created() {
    this.fetchMovies(this.currentPage);
  },
};
</script>
<template>
  <div class="bg-secondary main">
    <div class="container py-4 px-4">
  <form @submit.prevent="submitSearch">
    <div class="row">
      <div class="col-9">
        <div class="input-group">
          <input
            v-model="inputSearch"
            type="text"
            class="form-control font-bold px-2 text-xl rounded-start"
            placeholder="Search..."
          />
          <button
            type="submit"
            class="btn btn-primary text-xl font-semibold px-4"
          >
            Search
          </button>
        </div>
      </div>
      <div class="col-3">
        <button
          @click.prevent="
            inputSearch = '';
            showSearch = false;
          "
          class="btn btn-danger text-xl font-semibold px-4"
        >
          Clear
        </button>
      </div>
    </div>
  </form>
</div>
    <div class=" px-4 py-4">
  <div v-if="!showSearch" class="row">
    <div v-for="movie in moviesResult" class="col-md-2 mb-4">
      <div class="card">
        <div class=" d-flex align-items-center justify-content-between">
          <button @click="toggleFavorite(movie)" class="btn bg-dark bg-opacity-75 position-absolute top-0 start-0 p-2 bg-opacity-75 rounded-lg">
            {{isFavorite(movie) ? "❤" : "🤍"}}
          </button>
          <div class="py-2 px-3 bg-dark bg-opacity-75 position-absolute rounded-lg d-flex flex-column rounded top-0 end-0">
            
             
              <span class="text-white font-medium ms-1">⭐ {{ Math.floor(movie.vote_average * 10) / 10 }}</span>
            
            <span class="text-white fs-md">{{ movie.release_date }}</span>
          </div>
        </div>
        <router-link :to="{ name: 'detail', params: { id: movie.id } }">
          <img :src="addWwwToImageUrl(movie.poster_path)" :alt="movie.title" class="card-img-top" />
          <div class="card-body mt-2 text-center">
            <h3 class="card-title fs-lg whiteSpace">{{ movie.title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</div>

    <div class=" px-4 py-4">
  <div v-if="showSearch" class="row">
    <div v-for="movie in movieSearchResult" class="col-md-2 mb-4">
      <div class="card">
        <div class=" d-flex align-items-center justify-content-between">
          <button @click="toggleFavorite(movie)" class="btn bg-dark bg-opacity-75 position-absolute top-0 start-0 p-2 bg-opacity-75 rounded-lg">
            {{isFavorite(movie) ? "❤" : "🤍"}}
          </button>
          <div class="py-2 px-3 bg-dark bg-opacity-75 position-absolute rounded-lg d-flex flex-column rounded top-0 end-0">
            
             
              <span class="text-white font-medium ms-1">⭐ {{ Math.floor(movie.vote_average * 10) / 10 }}</span>
            
            <span class="text-white fs-md">{{ movie.release_date }}</span>
          </div>
        </div>
        <router-link :to="{ name: 'detail', params: { id: movie.id } }">
          <img :src="addWwwToImageUrl(movie.poster_path)" :alt="movie.title" class="card-img-top" />
          <div class="card-body mt-2 text-center">
            <h3 class="card-title fs-lg">{{ movie.title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</div>

    <div class="container mt-4">
  <div v-if="!showSearch" class="row justify-content-center align-items-center">
    <div class="col-12 text-center mb-4">
      <button
        class="btn btn-secondary mx-2"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <div class="btn-group" role="group">
        <button
          v-for="page in totalPagesArr"
          class="btn btn-primary"
          :key="page"
          :class="getPageButtonClass(page)"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        class="btn btn-secondary mx-2"
        :disabled="currentPage >= 10"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
  <div v-if="showSearch" class="row justify-content-center align-items-center">
    <div class="col-12 text-center mb-4">
      <button
        class="btn btn-secondary mx-2"
        :disabled="currentPageSearch === 1"
        @click="goToPageSearch(currentPageSearch - 1)"
      >
        Previous
      </button>
      <div class="btn-group" role="group">
        <button
          v-for="page in totalPagesSearchArr"
          class="btn btn-primary"
          :key="page"
          :class="getPageButtonClassSearch(page)"
          @click="goToPageSearch(page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        class="btn btn-secondary mx-2"
        :disabled="currentPage >= 10"
        @click="goToPageSearch(currentPageSearch + 1)"
      >
        Next
      </button>
    </div>
  </div>
</div>

  </div>
</template>
