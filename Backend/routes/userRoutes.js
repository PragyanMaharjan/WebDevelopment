import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../src/database/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { phoneNumber } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid phone number or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid phone number or password.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
