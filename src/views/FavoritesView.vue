<template>
    <div class="px-4 py-4 main">
    <div class="row">
        <div v-if="favorites.favorites.length === 0" class="text-center text-xl text-gray-500 col-span-5">
    Favorileriniz boş.
  </div>
<div v-else v-for="movie in favorites.favorites" class="col-md-2 mb-4">
       
         <div class="card">
        <div class=" d-flex align-items-center justify-content-between">
        <button @click="goToRemove(movie)" class="btn bg-dark bg-opacity-75 position-absolute top-0 start-0 p-2 bg-opacity-75 rounded-lg">
            ❤
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
   </div></div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMovieStore } from '../stores/movie'
const  favorites  =useMovieStore()
console.log("selam",favorites.favorites[0])
const addWwwToImageUrl=(imageUrl)=> {
      if (imageUrl == null || imageUrl == undefined) {
        return "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png";
      } else {
        return `http://image.tmdb.org/t/p/w500${imageUrl}`;
      }
    }
const goToRemove=(movie)=> {
      console.log(movie.adult);
      favorites.handleMovieRemove(movie);
    }

</script>

<style>

</style>