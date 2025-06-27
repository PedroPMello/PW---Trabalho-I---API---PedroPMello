const Administrador = require('../models/Administrador');

const getAllAdministradores = async (req, res) => {
  try {
    const administradores = await Administrador.getAllAdministradores();
    res.json(administradores);
  } catch (error) {
    console.error('Erro ao buscar administradores:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const getAdministradorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.user.role === 'admin' && req.user.id !== id) {
        return res.status(403).json({ message: 'Acesso negado: Administrador só pode ver seus próprios dados.' });
    }

    const administrador = await Administrador.getAdministradorById(id);

    if (!administrador) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json(administrador);
  } catch (error) {
    console.error('Erro ao buscar administrador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const createAdministrador = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoAdministrador = await Administrador.createAdministrador({ nome, email, senha });
    res.status(201).json(novoAdministrador);
  } catch (error) {
    console.error('Erro ao criar administrador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const updateAdministrador = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.user.role === 'admin' && req.user.id !== id) {
        return res.status(403).json({ message: 'Acesso negado: Administrador só pode atualizar seus próprios dados.' });
    }

    const { nome, email, senha } = req.body;
    const administradorAtualizado = await Administrador.updateAdministrador(id, { nome, email, senha });

    if (!administradorAtualizado) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json(administradorAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar administrador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const deleteAdministrador = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.user.id === id) {
        return res.status(403).json({ message: 'Acesso negado: Administrador não pode deletar a si mesmo.' });
    }

    await Administrador.deleteAdministrador(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar administrador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { getAllAdministradores, getAdministradorById, createAdministrador, updateAdministrador, deleteAdministrador,};