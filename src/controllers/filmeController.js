const Filme = require('../models/Filme');


const getAllFilmes = async (req, res) => {
  try {
    const filmes = await Filme.getAllFilmes();
    res.json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const getFilmeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filme = await Filme.getFilmeById(id);

    if (!filme) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    res.json(filme);
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const createFilme = async (req, res) => {
  try {
    const novoFilme = await Filme.createFilme(req.body);
    res.status(201).json(novoFilme);
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const updateFilme = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filmeAtualizado = await Filme.updateFilme(id, req.body);

    if (!filmeAtualizado) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    res.json(filmeAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const deleteFilme = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Filme.deleteFilme(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar filme:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { getAllFilmes, getFilmeById, createFilme, updateFilme, deleteFilme };