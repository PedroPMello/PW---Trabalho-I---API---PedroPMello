const Avaliacao = require('../models/Avaliacao');

const getAllAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.getAllAvaliacoes();
    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const getAvaliacaoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const avaliacao = await Avaliacao.getAvaliacaoById(id);

    if (!avaliacao) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    res.json(avaliacao);
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const createAvaliacao = async (req, res) => {
  try {
    const novaAvaliacao = await Avaliacao.createAvaliacao(req.body);
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const updateAvaliacao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const avaliacaoAtualizada = await Avaliacao.updateAvaliacao(id, req.body);

    if (!avaliacaoAtualizada) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    res.json(avaliacaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const deleteAvaliacao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Avaliacao.deleteAvaliacao(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { getAllAvaliacoes, getAvaliacaoById, createAvaliacao, updateAvaliacao, deleteAvaliacao, };