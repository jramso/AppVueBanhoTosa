export default class Animal {
    constructor(id = null, nome = '', idade = 0, idTutor = null, especie = '', raca = '') {
      this.id = id;
      this.nome = nome;
      this.idade = idade;
      this.idTutor = idTutor; // Relacionamento com Tutor
      this.especie = especie; // Enum: 'Gato' ou 'Cachorro'
      this.raca = raca; // Subtipo do Enum (Ex: 'AkitaAmericano', 'Angora', etc.)
    }
  }
  