const db = require('../db');

module.exports = {
  // Find user by email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; 
  },

  // Create new user
  create: async (user) => {
    const { name, email, password } = user;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  },

  // Get all users (without passwords)
  getAll: async () => {
    const [rows] = await db.query('SELECT id, name, email, created_at FROM users');
    return rows;
  }
};
