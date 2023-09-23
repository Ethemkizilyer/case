<template>
  <div class="container-fluid">
  <div class="row">
    <!-- Sol Navigasyon -->
    <div class="col-3">
      <Nav></Nav>
    </div>
    <!-- İçerik Alanı -->
    <div class="col-9">
      <div class="container">
        <router-view></router-view>
      </div>
      <!-- Footer -->
      <footer class="bg-dark text-light text-center py-4">
        <h3>Vue Movies</h3>
       
      </footer>
    </div>
  </div>
</div>
</template>

<script setup>
import Nav from './components/Nav.vue';

</script>

<style scoped></style>
