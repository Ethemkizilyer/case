<script>

</script>

<template>

  <div class=" navbar-dark bg-dark z-3 position-fixed top-0 asd">
  <nav class="navbar navbar-expand-lg d-flex justify-content-between">
    <router-link to="/" class="navbar-brand">
      <img src="../assets/logo.png" alt="Logo" class="cursor-pointer" />
    </router-link>
    

    <div class="d-flex pe-2">
      <ul class="navbar-nav text-light d-flex flex-row gap-3 me-auto mb-2 mb-lg-0 ">
        <li class="nav-item ">
          <router-link to="/" class="nav-link text-light">Movies</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/favorites" class="nav-link text-light">Favorites</router-link>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>
