const jwt = require('jsonwebtoken');
const { pool } = require('../../config');

const SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const adminResult = await pool.query('SELECT * FROM administrador WHERE email = $1', [email]);
    const administrador = adminResult.rows[0];

    if (administrador && administrador.senha === senha) {
      const token = jwt.sign(
        { id: administrador.id, email: administrador.email, role: 'admin' },
        SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ token, role: 'admin' });
    }

    const userResult = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    const usuario = userResult.rows[0];

    if (usuario && usuario.senha === senha) {
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, role: 'usuario' },
        SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ token, role: 'usuario' });
    }

    return res.status(401).json({ message: 'Credenciais inválidas' });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { login };