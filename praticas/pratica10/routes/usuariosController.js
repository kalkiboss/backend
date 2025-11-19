const authMiddleware = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel');

async function criar(req, res) {
    if (!req.body.email || !req.body.senha) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
    try {
        const senhaCifrada = authMiddleware.cifrarSenha(req.body.senha);
        const novoUsuario = await Usuario.create({
            email: req.body.email,
            senha: senhaCifrada
        });
        res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
    } catch (err) {
        res.status(500).json({ msg: "Erro ao criar usuário" });
    }
}

async function entrar(req, res) {
    try {
        const usuarioEncontrado = await Usuario.findOne({ email: req.body.usuario });

        if (usuarioEncontrado && authMiddleware.compararSenha(req.body.senha, usuarioEncontrado.senha)) {
            const token = authMiddleware.gerarToken({ email: req.body.usuario });
            return res.status(200).json({ token });
        }
        return res.status(401).json({ msg: "Credenciais inválidas" });
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor" });
    }
}

async function renovar(req, res) {
    const token = authMiddleware.gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
}

async function remover(req, res) {
    try {
        await Usuario.findOneAndDelete({ email: req.body.usuario });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ msg: "Erro ao remover" });
    }
}

module.exports = { criar, entrar, renovar, remover };