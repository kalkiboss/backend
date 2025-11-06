
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verificarToken, (req, res) => {
    res.status(200).json([
    ]);
});

module.exports = router;