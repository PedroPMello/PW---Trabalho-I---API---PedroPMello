const { pool } = require('../../config');

const getAllFilmes = async () => {
  const result = await pool.query('SELECT * FROM filmes');
  return result.rows;
};

const getFilmeById = async (id) => {
  const result = await pool.query('SELECT * FROM filmes WHERE id = $1', [id]);
  return result.rows[0];
};

const createFilme = async (filme) => {
  const { titulo, sinopse, ano } = filme;
  const result = await pool.query(
    'INSERT INTO filmes (titulo, sinopse, ano) VALUES ($1, $2, $3) RETURNING *',
    [titulo, sinopse, ano]
  );
  return result.rows[0];
};

const updateFilme = async (id, filme) => {
  const { titulo, sinopse, ano } = filme;
  const result = await pool.query(
    'UPDATE filmes SET titulo = $1, sinopse = $2, ano = $3 WHERE id = $4 RETURNING *',
    [titulo, sinopse, ano, id]
  );
  return result.rows[0];
};

const deleteFilme = async (id) => {
  await pool.query('DELETE FROM filmes WHERE id = $1', [id]);
};

module.exports = { getAllFilmes, getFilmeById, createFilme, updateFilme, deleteFilme };