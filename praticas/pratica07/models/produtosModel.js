const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"], 
    minlength: [3, "Nome deve ter no mínimo 3 caracteres"] // 6.c
  },
  preco: {
    type: Number,
    required: [true, "Preço é obrigatório"] 
  }
});
    
module.exports = mongoose.model('Produto', schema);