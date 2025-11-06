
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', (req, res) => {
    try {
        const payload = { email: req.body.usuario }; 
        const token = authMiddleware.gerarToken(payload);
        
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
});

router.post('/renovar', authMiddleware.verificarToken, (req, res) => {
    try {
        const payload = { email: req.usuario.email }; 
        const token = authMiddleware.gerarToken(payload);
        
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
});

module.exports = router;