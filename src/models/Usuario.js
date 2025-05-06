const { pool } = require('../../config');

const getAllUsuarios = async () => {
  const result = await pool.query('SELECT * FROM usuario');
  return result.rows;
};

const getUsuarioById = async (id) => {
  const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
  return result.rows[0];
};

const createUsuario = async (usuario) => {
  const { nome, email, senha } = usuario;
  const result = await pool.query(
    'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senha]
  );
  return result.rows[0];
};

const updateUsuario = async (id, usuario) => {
  const { nome, email, senha } = usuario;
  const result = await pool.query(
    'UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
    [nome, email, senha, id]
  );
  return result.rows[0];
};

const deleteUsuario = async (id) => {
  await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
};

module.exports = { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };