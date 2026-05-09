const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/messages', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages(text) VALUES($1) RETURNING *',
      [text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
