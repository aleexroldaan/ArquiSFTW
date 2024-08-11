const isAdmin = (req, res, next) => {
  if (req.session.rol === 1) {
    return next();
  } else {
    res.status(403).send('No tienes permisos para acceder a esta página');
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.session.usuarioId) {
    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = { isAdmin, isLoggedIn };
