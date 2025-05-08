const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/avaliacoes', avaliacaoController.getAllAvaliacoes);

router.get('/avaliacoes/:id', avaliacaoController.getAvaliacaoById);

router.post('/avaliacoes', avaliacaoController.createAvaliacao);

router.put('/avaliacoes/:id', avaliacaoController.updateAvaliacao);

router.delete('/avaliacoes/:id', avaliacaoController.deleteAvaliacao);

router.get('/avaliacoes/filme/:id', avaliacaoController.getAvaliacoesPorFilme);

module.exports = router;