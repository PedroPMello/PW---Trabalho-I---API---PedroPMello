const { pool } = require('../../config');

const getAllAdministradores = async () => {
  const result = await pool.query('SELECT * FROM administrador');
  return result.rows;
};

const getAdministradorById = async (id) => {
  const result = await pool.query('SELECT * FROM administrador WHERE id = $1', [id]);
  return result.rows[0];
};

const createAdministrador = async (admin) => {
  const { nome, email, senha } = admin;
  const result = await pool.query(
    'INSERT INTO administrador (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senha]
  );
  return result.rows[0];
};

const updateAdministrador = async (id, admin) => {
  const { nome, email, senha } = admin;
  const result = await pool.query(
    'UPDATE administrador SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
    [nome, email, senha, id]
  );
  return result.rows[0];
};

const deleteAdministrador = async (id) => {
  await pool.query('DELETE FROM administrador WHERE id = $1', [id]);
};

module.exports = { getAllAdministradores, getAdministradorById, createAdministrador, updateAdministrador, deleteAdministrador, };