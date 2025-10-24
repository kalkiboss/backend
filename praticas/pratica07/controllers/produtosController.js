const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    const novoProduto = await Produto.create(req.body);
   res.status(201).json(novoProduto);
  } catch (error) {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }
  
  try {
    const produtoEncontrado = await Produto.findOne({ _id: req.params.id });
    
    if (produtoEncontrado) {
      req.produto = produtoEncontrado;
      return next(); // Chama o próximo middleware (exibir, atualizar, remover)
    } else {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

function exibir(req, res) {
  res.status(200).json(req.produto);
}

// 5.o: Função atualizar()
async function atualizar(req, res) {
  try {
    // 5.p: Extraia 'nome' e 'preco' do corpo (ISSO É O IMPORTANTE)
    const { nome, preco } = req.body; 

    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id }, 
      { nome, preco }, // <--- NÃO PODE SER req.body AQUI
      { 
        runValidators: true, // 5.p (Validar o schema)
        new: true // Retorna o documento atualizado
      }
    );
    
    // 5.q: Retorno 200
    res.status(200).json(produtoAtualizado);

  } catch (error) {
    // 5.r: Retorno 422 (O 'catch' vai funcionar agora)
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function remover(req, res) {
  try {
    await Produto.findOneAndDelete({ _id: req.params.id });
    res.status(204).send(); // sem conteúdo
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};