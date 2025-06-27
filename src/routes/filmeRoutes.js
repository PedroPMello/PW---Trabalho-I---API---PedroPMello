const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const { autenticarToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/filmes', autenticarToken, filmeController.getAllFilmes);
router.get('/filmes/:id', autenticarToken, filmeController.getFilmeById);

router.post('/filmes', autenticarToken, isAdmin, filmeController.createFilme);
router.put('/filmes/:id', autenticarToken, isAdmin, filmeController.updateFilme);
router.delete('/filmes/:id', autenticarToken, isAdmin, filmeController.deleteFilme);

module.exports = router;