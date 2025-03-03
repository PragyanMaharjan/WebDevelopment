// controller/userController.js
import jwt from 'jsonwebtoken';
import { User } from '../src/database/db.js';

// Controller for user login
export const fetchUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {  // In production, passwords should be hashed
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for creating new users (optional)
export const createUser = async (req, res) => {
  const { username, password, phoneNumber } = req.body;

  try {
    const newUser = await User.create({ username, password, phoneNumber });
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
