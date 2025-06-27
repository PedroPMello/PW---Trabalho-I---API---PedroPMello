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
  let query = 'UPDATE usuario SET ';
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (usuario.nome !== undefined) {
    updates.push(`nome = $${paramCount++}`);
    values.push(usuario.nome);
  }
  if (usuario.email !== undefined) {
    updates.push(`email = $${paramCount++}`);
    values.push(usuario.email);
  }
  if (usuario.senha !== undefined && usuario.senha !== '') {
    updates.push(`senha = $${paramCount++}`);
    values.push(usuario.senha);
  }

  if (updates.length === 0) {
    const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
    return result.rows[0];
  }

  query += updates.join(', ') + ` WHERE id = $${paramCount++} RETURNING *`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUsuario = async (id) => {
  await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
};

module.exports = { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };