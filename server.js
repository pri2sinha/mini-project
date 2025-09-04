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
