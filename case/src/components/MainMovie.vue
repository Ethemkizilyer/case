<template>
  <main class="container-fluid d-flex justify-content-between" v-if="mainMovie">
    <div class="container d-flex flex-column gap-4 justify-center z-20 min-h-100 w-100 lg:w-50 px-4 lg:px-12">
      <h1 class="h1">{{ mainMovie.title }}</h1>
      <section class="d-flex gap-2">
        <small class="text-success">
          <span class="text-success">★</span>
          {{ mainMovie.rating }}
        </small>
        <small v-show="mainMovie.date">{{ mainMovie.date }}</small>
        <small>{{ mainMovie.duration }}</small>
      </section>
      <p>{{ mainMovie.description }}</p>
      <router-link :to="`movies/${mainMovie.id}`" class="w-auto" v-if="!disableOverview">
        <button class="btn btn-success">Overview →</button>
      </router-link>
    </div>
    <picture class="position-absolute md-relative right-0 object-cover z-10 w-100 md:w-50 h-100 md-blur-none blur-md transition hover-scale-105">
      <div class="bg-gradient-to-left from-transparent to-black w-100 h-100 position-absolute right-0 top-0"></div>
      <img :src="`${mainMovie.backdrop}`" :alt="mainMovie.title" class="object-cover w-100 h-100" />
    </picture>
  </main>
</template>

<script setup>


defineProps({
  mainMovie: {
    required: true,
  },
})
</script>

<style scoped></style>
