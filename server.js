const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override'); // Añadir esta línea
const app = express();
const rutasProducto = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(methodOverride('_method')); // Añadir esta línea

app.use('/api/producto', rutasProducto);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
