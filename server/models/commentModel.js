const db = require('../db');

module.exports = {
  create: async (comment) => {
    const { audio_id, user_id, content } = comment;
    const [result] = await db.query(
      'INSERT INTO comments (audio_id, user_id, content) VALUES (?, ?, ?)',
      [audio_id, user_id, content]
    );
    return { id: result.insertId, audio_id, user_id, content };
  },

  findByAudio: async (audio_id) => {
    const [rows] = await db.query(
      `SELECT comments.*, users.name AS commenter
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE audio_id = ?
       ORDER BY comments.created_at ASC`,
      [audio_id]
    );
    return rows;
  }
};
