const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // to serve HTML/CSS/JS

// 🔐 Replace with your actual AWS MySQL details
const db = mysql.createConnection({
  host: 'your-aws-endpoint',     // e.g., abc123.rds.amazonaws.com
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
});

// 🔄 Connect to the DB
db.connect(err => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
  } else {
    console.log('✅ Connected to AWS MySQL DB');
  }
});

// SiGNUP
app.post('/api/signup', async (req, res) => {
  const { name, email, password, phone, location } = req.body;

  // Check if email already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password, phone, location) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, location],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(200).json({ message: 'Signup successful' });
      }
    );
  });
});

//Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  });
});

