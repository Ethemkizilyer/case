<template>
  <router-link :to="`/movies/${movie.id}`">
    <div class="card" style="min-width: 250px; min-height: 200px; max-height: 600px;">
      <div class="card-body d-flex flex-column gap-2">
        <h5 class="card-title truncate" style="max-width: 250px;">{{ movie.title }}</h5>
        <div class="d-flex justify-content-between align-items-center px-2">
          <div class="d-flex gap-2">
            <span class="text-success">★</span>
            <p>{{ movie.rating }}</p>
          </div>
          <button @click.prevent="favorites.handleMovie(movie)" class="btn btn-primary">
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>

import { useFavorites } from '../stores/counter'

const favorites = useFavorites()

defineProps({
  movie: {
    required: true,
  }
})
</script>

<style lang="scss" scoped></style>
