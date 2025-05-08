const { pool } = require('../../config');

const getAllFilmes = async () => {
  const result = await pool.query('SELECT * FROM filme');
  return result.rows;
};

const getFilmeById = async (id) => {
  const result = await pool.query('SELECT * FROM filme WHERE id = $1', [id]);
  return result.rows[0];
};

const createFilme = async (filme) => {
  const { titulo, sinopse, ano, genero, elenco, plataforma, administrador_id } = filme;
  const result = await pool.query(
    'INSERT INTO filme (titulo, sinopse, ano, genero, elenco, plataforma, administrador_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [titulo, sinopse, ano, genero, elenco, plataforma, administrador_id]
  );
  return result.rows[0];
};

const updateFilme = async (id, filme) => {
  const { titulo, sinopse, ano, genero, elenco, plataforma } = filme;
  const result = await pool.query(
    'UPDATE filme SET titulo = $1, sinopse = $2, ano = $3, genero = $4, elenco = $5, plataforma = $6 WHERE id = $7 RETURNING *',
    [titulo, sinopse, ano, genero, elenco, plataforma, id]
  );
  return result.rows[0];
};

const deleteFilme = async (id) => {
  await pool.query('DELETE FROM filme WHERE id = $1', [id]);
};

module.exports = { getAllFilmes, getFilmeById, createFilme, updateFilme, deleteFilme };