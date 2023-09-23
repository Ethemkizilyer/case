<template>
  <aside class="w-full overflow-hidden">
     <Search @input-value="(e) => (search = e)" />
    <div class="min-h-[40rem]">
      <MainMovieVue v-if="mainMovie" :main-movie="mainMovie" ></MainMovieVue>
    </div>
    <div class="w-full overflow-x-auto flex bg-soft_gray p-6 gap-10 min-h-[35rem]">
      <MovieCardVue v-for="movie in movies" :key="movie.id" :movie="movie" type="movies" ></MovieCardVue>
    </div>

    <div class="w-full overflow-x-auto flex bg-soft_gray p-6 gap-10 min-h-[35rem]">
      <MovieCardVue v-for="tvShow in tvShows" :key="tvShow.id" :movie="tvShow" type="tv" ></MovieCardVue>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref, watch  } from 'vue'
import useMovies from '../custom/useMovies'
import MovieCardVue from '../components/MovieCard.vue';
import MainMovieVue from '../components/MainMovie.vue';
import Search from '../components/Search.vue';

const { movies, tvShows, mainMovie, getMoviesList, filterMovies, getGenresList  } = useMovies()
const search = ref()
const filteredMovies = ref([])
const genres = ref()
const filterValue = ref(0)

watch(search, () => {
  filteredMovies.value = filterMovies(search.value, 'name')
})

watch(filterValue, () => {
  filteredMovies.value = filterMovies(filterValue.value, 'genre')
})
onMounted(async () => {
  await getMoviesList()
  filteredMovies.value = await getMoviesList()
  genres.value = await getGenresList()
//   await getTvShowList()
//   await getRandomMovie(movies)
})
</script>

<style scoped></style>
