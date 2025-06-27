const Usuario = require('../models/Usuario');

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (req.user.role === 'usuario' && req.user.id !== id) {
        return res.status(403).json({ message: 'Acesso negado: Usuário comum só pode ver seus próprios dados.' });
    }

    const usuario = await Usuario.getUsuarioById(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await Usuario.createUsuario({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.user.role === 'usuario' && req.user.id !== id) {
        return res.status(403).json({ message: 'Acesso negado: Usuário comum só pode atualizar seus próprios dados.' });
    }

    const { nome, email, senha } = req.body;

    const usuarioAtualizado = await Usuario.updateUsuario(id, { nome, email, senha });

    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuarioAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Usuario.deleteUsuario(id);
    res.status(204).send(); 
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario,};