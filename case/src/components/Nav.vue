<template>
  <header class="bg-dark p-4 border-end border-secondary border-1 h-100 sticky-top">
    <nav>
     <ul class="nav flex-column justify-content-between vh-100">
  <li class="nav-item">
    <RouterLink to="/" exact-active-class="is-active" class="nav-link">
      Movie
    </RouterLink>
  </li>

  <li class="nav-item">
    <RouterLink to="/favorites" exact-active-class="is-active" class="nav-link">
      Favorite
    </RouterLink>
  </li>
</ul>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';


</script>

<style>
.is-active {
  color: #41b883;
}
</style>
