const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function verificarToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({msg: 'Token invalido'});

    try{
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token invalido"});
    }
}

function gerarToken(payload){
    try{
        const expiresIn = process.env.JWT_EXPIRES || '1h';
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
    } catch (err) {
        console.error(err);
        throw new Error('Erro ao gerar o token');
    }
}

function cifrarSenha(senha){
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salto);
    return hash;
}

function compararSenha(senha,hash){
    return bcrypt.compareSync(senha,hash);
}

module.exports = {verificarToken, gerarToken, cifrarSenha, compararSenha};