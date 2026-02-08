const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./expenses.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// ================== CRUD ROUTES ==================

// Create Expense
app.post('/expenses', (req, res) => {
  const { title, amount } = req.body;
  const sql = 'INSERT INTO expenses (title, amount) VALUES (?, ?)';
  db.run(sql, [title, amount], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, title, amount });
  });
});

// Read all Expenses
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses ORDER BY date DESC', [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Read single Expense
app.get('/expenses/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM expenses WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(row);
  });
});

// Update Expense
app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const sql = 'UPDATE expenses SET title = ?, amount = ? WHERE id = ?';
  db.run(sql, [title, amount, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Updated', changes: this.changes });
  });
});

// Delete Expense
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM expenses WHERE id = ?', [id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Deleted', changes: this.changes });
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
