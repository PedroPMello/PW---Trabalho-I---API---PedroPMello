const jwt = require('jsonwebtoken');
const { pool } = require('../../config');

const SECRET = process.env.JWT_SECRET;

const loginAdministrador = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM administrador WHERE email = $1', [email]);
    const administrador = result.rows[0];

    if (!administrador || administrador.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: administrador.id, email: administrador.email },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { loginAdministrador };