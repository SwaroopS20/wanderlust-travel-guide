const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- SIGN UP ROUTE ---
app.post('/api/auth/signup', async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'An account with this email already exists!' });
    }

    // Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into PostgreSQL
    const newUser = await pool.query(
      'INSERT INTO users (fullname, email, password_hash) VALUES ($1, $2, $3) RETURNING id, fullname, email',
      [fullname, cleanEmail, hashedPassword]
    );

    res.status(201).json({
      message: 'Account created successfully!',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

// --- LOGIN ROUTE ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No account found with this email.' });
    }

    const user = result.rows[0];

    // Verify password match
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user.id, fullname: user.fullname, email: user.email },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Wanderlust Backend API is running!');
});
app.listen(PORT, () => console.log(`🚀 Backend server running on http://localhost:${PORT}`));