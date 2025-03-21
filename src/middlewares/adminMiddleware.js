function adminMiddleware(req, res, next) {
    if (req.tipoUsuario !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado: apenas administradores podem acessar esta rota' });
    }
    next();
  }
  
  module.exports = adminMiddleware;