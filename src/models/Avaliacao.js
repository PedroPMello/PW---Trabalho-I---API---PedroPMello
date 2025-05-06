const { pool } = require('../../config');

const getAllAvaliacoes = async () => {
  const result = await pool.query('SELECT * FROM avaliacao');
  return result.rows;
};

const getAvaliacaoById = async (id) => {
  const result = await pool.query('SELECT * FROM avaliacao WHERE id = $1', [id]);
  return result.rows[0];
};

const createAvaliacao = async (avaliacao) => {
  const { usuario_id, filme_id, nota, comentario } = avaliacao;
  const result = await pool.query(
    'INSERT INTO avaliacao (usuario_id, filme_id, nota, comentario) VALUES ($1, $2, $3, $4) RETURNING *',
    [usuario_id, filme_id, nota, comentario]
  );
  return result.rows[0];
};

const updateAvaliacao = async (id, avaliacao) => {
  const { usuario_id, filme_id, nota, comentario } = avaliacao;
  const result = await pool.query(
    'UPDATE avaliacao SET usuario_id = $1, filme_id = $2, nota = $3, comentario = $4 WHERE id = $5 RETURNING *',
    [usuario_id, filme_id, nota, comentario, id]
  );
  return result.rows[0];
};

const deleteAvaliacao = async (id) => {
  await pool.query('DELETE FROM avaliacao WHERE id = $1', [id]);
};

module.exports = { getAllAvaliacoes, getAvaliacaoById, createAvaliacao, updateAvaliacao, deleteAvaliacao, };