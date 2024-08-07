const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '34.29.36.221',
  user: 'sa',
  password: 'aaa',
  database: 'InvZapatos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
