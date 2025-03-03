import { User } from '../src/database/db.js';
import bcrypt from 'bcrypt';

export const fetchUser = async (userData) => {
  try {
    console.log('Fetching user with phone number:', userData.phoneNumber);

    // Logic to fetch user by phone number
    const user = await User.findOne({ where: { phoneNumber: userData.phoneNumber } });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    console.log('User fetched successfully:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    console.log('Creating user with data:', userData);

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Logic to create user
    const user = await User.create(userData);
    console.log('User created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    // Logic to update user
    const user = await User.update(userData, { where: { id: userData.id } });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    // Logic to delete user
    const user = await User.destroy({ where: { id: userId } });
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default { fetchUser, createUser, updateUser, deleteUser };