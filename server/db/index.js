const mysql = require('mysql2/promise');
require('dotenv').config(); 

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Donald',
  password: process.env.DB_PASSWORD || 'synth0577',
  database: process.env.DB_NAME || 'synth_db',
});

module.exports = db;
