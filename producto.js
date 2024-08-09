const pool = require('../bdConfig');

const obtenerProductos = async () => {
  const [rows] = await pool.query('SELECT * FROM Producto');
  return rows;
};

const agregarProducto = async (producto) => {
  const { Modelo, Numero, Color, Cantidad, Precio, CategoriaId } = producto;
  const [result] = await pool.query(
    'INSERT INTO Producto (Modelo, Numero, Color, Cantidad, Precio, CategoriaId) VALUES (?, ?, ?, ?, ?, ?)', 
    [Modelo, Numero, Color, Cantidad, Precio, CategoriaId]
  );
  return result.insertId;
};

const actualizarProducto = async (id, producto) => {
  const { Modelo, Numero, Color, Cantidad, Precio, CategoriaId } = producto;
  const [result] = await pool.query(
    'UPDATE Producto SET Modelo = ?, Numero = ?, Color = ?, Cantidad = ?, Precio = ?, CategoriaId = ? WHERE ProductoId = ?', 
    [Modelo, Numero, Color, Cantidad, Precio, CategoriaId, id]
  );
  return result.affectedRows;
};

const eliminarProducto = async (id) => {
  const [result] = await pool.query('DELETE FROM Producto WHERE ProductoId = ?', [id]);
  return result.affectedRows;
};

module.exports = { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto };
