const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id; // Adiciona o ID do usuário à requisição
    req.tipoUsuario = decoded.tipoUsuario; // Adiciona o tipo de usuário à requisição
    next();
  });
}

module.exports = authMiddleware;