const pool = require('../bdConfig');
const bcrypt = require('bcryptjs');

exports.mostrarLogin = (req, res) => {
  res.render('auth/login');
};

exports.procesarLogin = async (req, res) => {
  const { correo, contrasenia } = req.body;
  const [usuarios] = await pool.query('SELECT * FROM Usuario WHERE CorreoElectronicoU = ?', [correo]);
  
  if (usuarios.length > 0) {
    const usuario = usuarios[0];
    const validPassword = await bcrypt.compare(contrasenia, usuario.ContraseniaU);

    if (validPassword) {
      req.session.usuarioId = usuario.UsuarioId;
      req.session.rol = usuario.RolId;
      return res.redirect('/api/producto');
    }
  }
  res.status(401).send('Correo o contraseña incorrectos');
};

exports.mostrarRegistro = (req, res) => {
  res.render('auth/register');
};

exports.procesarRegistro = async (req, res) => {
  const { nombre, correo, contrasenia, rolId } = req.body;
  const hashedPassword = await bcrypt.hash(contrasenia, 10);
  
  try {
    await pool.query('INSERT INTO Usuario (NombreU, CorreoElectronicoU, ContraseniaU, RolId) VALUES (?, ?, ?, ?)', [nombre, correo, hashedPassword, rolId]);
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }

    res.clearCookie('connect.sid'); 
    res.redirect('/login');
  });
};

