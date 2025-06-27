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
  let query = 'UPDATE administrador SET ';
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (admin.nome !== undefined) {
    updates.push(`nome = $${paramCount++}`);
    values.push(admin.nome);
  }
  if (admin.email !== undefined) {
    updates.push(`email = $${paramCount++}`);
    values.push(admin.email);
  }
  if (admin.senha !== undefined && admin.senha !== '') {
    updates.push(`senha = $${paramCount++}`);
    values.push(admin.senha);
  }

  if (updates.length === 0) {
    const result = await pool.query('SELECT * FROM administrador WHERE id = $1', [id]);
    return result.rows[0];
  }

  query += updates.join(', ') + ` WHERE id = $${paramCount++} RETURNING *`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};


const deleteAdministrador = async (id) => {
  await pool.query('DELETE FROM administrador WHERE id = $1', [id]);
};

module.exports = { getAllAdministradores, getAdministradorById, createAdministrador, updateAdministrador, deleteAdministrador, };