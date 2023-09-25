<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { onMounted } from "vue";
import { useMovieStore } from "./stores/movie";
const  favorites  =useMovieStore()

onMounted(() => {
  favorites.loadFavorites();
});
</script>

<template>
 <div class="min-h-screen">

     <Navbar />
     <RouterView />
     <Footer />
 </div>
</template>


