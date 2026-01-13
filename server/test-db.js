const db = require('./db');

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('DB connected, test query result:', rows[0].result);
  } catch (err) {
    console.error('DB connection error:', err);
  }
})();
