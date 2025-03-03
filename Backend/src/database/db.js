// src/database/db.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set up Sequelize instance for database connection
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres',
});

// Define the User model
export const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Define the Order model
export const Order = sequelize.define('Order', {
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Function to connect to the database and sync models
export const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Export Sequelize instance
export default sequelize;
