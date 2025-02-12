<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/LOGO_uauDog.png" alt="Logo" class="me-2" width="40" height="40">
          Banho & Tosa
        </router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link class="nav-link" to="/agendamento">Agendamento</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/animais">Animais</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/servicos">Serviços</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/tutores">Tutores</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
