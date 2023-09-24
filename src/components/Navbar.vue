<script>

</script>

<template>

  <div class="navbar navbar-dark bg-dark z-3 position-fixed top-0 w-100">
  <nav class="container-fluid">
    <router-link to="/" class="navbar-brand">
      <img src="../assets/logo.png" alt="Logo" class="cursor-pointer" />
    </router-link>

    <div class="d-flex">
      <ul class="navbar-nav d-flex flex-row gap-3 me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Movies</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/favorites" class="nav-link">Favorites</router-link>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>
