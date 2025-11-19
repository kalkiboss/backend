const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);
router.post('/renovar', authMiddleware.verificarToken, usuariosController.renovar);
router.delete('/', authMiddleware.verificarToken, usuariosController.remover);
module.exports = router;