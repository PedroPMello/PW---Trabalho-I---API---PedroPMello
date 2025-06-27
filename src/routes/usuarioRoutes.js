const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticarToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/usuarios', autenticarToken, isAdmin, usuarioController.getAllUsuarios);
router.get('/usuarios/:id', autenticarToken, usuarioController.getUsuarioById);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:id', autenticarToken, usuarioController.updateUsuario);
router.delete('/usuarios/:id', autenticarToken, isAdmin, usuarioController.deleteUsuario);

module.exports = router;