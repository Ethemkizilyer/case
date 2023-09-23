<template>
  <div>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-if="movieById" class="flex flex-column">
      <MainMovie :main-movie="movieById" disableOverview />
      <main class="min-vh-50 bg-light w-100 d-flex justify-content-center align-items-center p-4">
        <section class="w-100 lg:w-50 d-flex gap-3">
          <div class="h-75 d-none d-lg-flex">
            <Poster :poster="{ posterLink: movieById.poster, title: movieById.title }" />
          </div>
          <div class="flex flex-column gap-4">
            <h3 class="h1">Storyline</h3>
            <p class="max-w-40rem">{{ movieById.description }}</p>
            <hr class="border border-success" />
            <div class="row row-cols-1 row-cols-lg-2 gap-3">
              <small class="col">
                Rating
                <span class="text-success">★</span> {{ movieById.rating }}
              </small>
              <small class="col">
                Released
                {{ movieById.date }}
              </small>
              <small class="col">
                Budget
                {{ movieById.budget }}
              </small>
              <small class="col">
                Duration
                {{ movieById.duration }}
              </small>
              <small class="col">
                Genres
                <span v-for="genre in movieById.genres" :key="genre.id" class="bg-success p-2 rounded">
                  {{ genre.name }}
                </span>
              </small>
              <small class="col">
                Production
                <span v-for="production in movieById.production" :key="production.id" class="mr-2">{{ production.name }}</span>
              </small>
            </div>
          </div>
        </section>
      </main>
    </div>
    <div v-if="error">
      <p>An error occurred while searching for the movie</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import useMovies from '../custom/useMovies'

import MainMovie from '../components/MainMovie.vue';

const route = useRoute()

const { getMovieByIdData, movieById, error, loading } = useMovies()

onMounted(async () => {
  await getMovieByIdData(Number(route.params.id))
})
</script>

<style scoped></style>
