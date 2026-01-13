const db = require('../db');

module.exports = {
  create: async (audio) => {
    const { user_id, title, file_path } = audio;
    const [result] = await db.query(
      'INSERT INTO audios (user_id, title, file_path) VALUES (?, ?, ?)',
      [user_id, title, file_path]
    );
    return { id: result.insertId, user_id, title, file_path };
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM audios WHERE id = ?', [id]);
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await db.query(
      `SELECT audios.*, users.name AS uploader
       FROM audios 
       JOIN users ON audios.user_id = users.id
       ORDER BY audios.created_at DESC`
    );
    return rows;
  },

  findByUser: async (user_id) => {
    const [rows] = await db.query('SELECT * FROM audios WHERE user_id = ?', [user_id]);
    return rows;
  }
};
