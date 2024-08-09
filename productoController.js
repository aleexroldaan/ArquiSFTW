const pool = require('../bdConfig');

exports.listarProductos = async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT p.*, c.Genero FROM Producto p JOIN Categoria c ON p.CategoriaId = c.CategoriaId');
    
    // Obtener tallas para cada producto
    for (const producto of productos) {
      const [tallas] = await pool.query('SELECT * FROM Tallas WHERE ProductoId = ?', [producto.ProductoId]);
      producto.tallas = tallas;
    }

    // Agrupar productos por categoría
    const productosPorCategoria = productos.reduce((acc, producto) => {
      if (!acc[producto.Genero]) {
        acc[producto.Genero] = [];
      }
      acc[producto.Genero].push(producto);
      return acc;
    }, {});

    res.render('producto/index', { productosPorCategoria });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};


exports.formularioNuevoProducto = async (req, res) => {
  try {
    const [categorias] = await pool.query('SELECT * FROM Categoria');
    res.render('producto/nuevo', { categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};


exports.mostrarFormularioNuevo = async (req, res) => {
  try {
    const [categorias] = await pool.query('SELECT * FROM Categoria');
    res.render('producto/nuevo', { categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};


exports.agregarProducto = async (req, res) => {
  const { modelo, color, precio, categoriaId, numeros, cantidades } = req.body;
  try {
    // Verificar si la categoría existe
    const [categorias] = await pool.query('SELECT * FROM Categoria WHERE CategoriaId = ?', [categoriaId]);
    if (categorias.length === 0) {
      return res.status(400).send('La categoría especificada no existe.');
    }

    // Insertar el producto
    const [result] = await pool.query('INSERT INTO Producto (Modelo, Color, Precio, CategoriaId) VALUES (?, ?, ?, ?)', [modelo, color, precio, categoriaId]);
    const productoId = result.insertId;

    // Insertar las tallas y cantidades
    if (numeros && cantidades && Array.isArray(numeros) && Array.isArray(cantidades)) {
      for (let i = 0; i < numeros.length; i++) {
        const numero = numeros[i];
        const cantidad = cantidades[i];
        await pool.query('INSERT INTO Tallas (ProductoId, Numero, Cantidad) VALUES (?, ?, ?)', [productoId, numero, cantidad]);
      }
    }

    res.redirect('/api/producto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};



exports.editarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [producto] = await pool.query('SELECT * FROM Producto WHERE ProductoId = ?', [id]);
    const [categorias] = await pool.query('SELECT * FROM Categoria');
    const [tallas] = await pool.query('SELECT * FROM Tallas WHERE ProductoId = ?', [id]);

    if (producto.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('producto/editar', { producto: producto[0], categorias, tallas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};



exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { modelo, color, precio, categoriaId, numeros, cantidades } = req.body;
  try {
    await pool.query('UPDATE Producto SET Modelo = ?, Color = ?, Precio = ?, CategoriaId = ? WHERE ProductoId = ?', [modelo, color, precio, categoriaId, id]);

    await pool.query('DELETE FROM Tallas WHERE ProductoId = ?', [id]);

    if (numeros && cantidades && Array.isArray(numeros) && Array.isArray(cantidades)) {
      for (let i = 0; i < numeros.length; i++) {
        const numero = numeros[i];
        const cantidad = cantidades[i];
        await pool.query('INSERT INTO Tallas (ProductoId, Numero, Cantidad) VALUES (?, ?, ?)', [id, numero, cantidad]);
      }
    }

    res.redirect('/api/producto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Tallas WHERE ProductoId = ?', [id]);
    await pool.query('DELETE FROM Producto WHERE ProductoId = ?', [id]);
    res.redirect('/api/producto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};
