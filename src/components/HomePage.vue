<template>
    <div>
      <!-- Banner -->
      <div class="banner">
        <div class="container text-center text-white">
          <h1 class="fw-bold">Bem-vindo ao PetShop!</h1>
          <p class="fs-4">Agende um banho e tosa para seu pet com conforto e segurança.</p>
          <router-link to="/agendamento" class="btn btn-lg btn-warning fw-bold mt-3">📅 Agendar Agora</router-link>
        </div>
      </div>
  
      <!-- Seção de Serviços -->
      <div class="container text-center mt-5">
        <h2 class="fw-bold mb-4">🐶 Nossos Serviços 🐱</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card shadow">
              <img src="../assets/UD1.png" class="card-img-top" alt="Banho de cachorro">
              <div class="card-body">
                <h5 class="card-title fw-bold">Banho</h5>
                <p class="card-text">Deixe seu pet limpinho e cheiroso com nossos banhos especiais!</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-4">
            <div class="card shadow">
              <img src="../assets/UD2.png" class="card-img-top" alt="Tosa de cachorro">
              <div class="card-body">
                <h5 class="card-title fw-bold">Tosa</h5>
                <p class="card-text">Cortes modernos e cuidados com a pelagem do seu pet.</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-4">
            <div class="card shadow">
              <img src="../assets/UD3.png" class="card-img-top" alt="Consulta veterinária">
              <div class="card-body" disabled>
                <h5 class="card-title fw-bold" disabled>EM BREVE - Consulta Veterinária</h5>
                <p class="card-text">Seu pet saudável e bem cuidado com nossos veterinários especializados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Rodapé -->
      <footer class="footer mt-5 p-3 text-center bg-dark text-white">
        <p class="m-0">🐾 Banho e Tosa - Cuidando do seu pet com carinho! ❤️</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage"
  };
  </script>
  
  <style scoped>
  /* Banner */
  .banner {
    background: url("../assets/FundoUD.png") no-repeat center center/cover;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  /* Cartões */
  .card {
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  .card:hover {
    transform: scale(1.05);
  }
  </style>
  