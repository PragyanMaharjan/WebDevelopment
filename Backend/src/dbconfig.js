import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  db: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
  }
};

const sequelize = new Sequelize(dbConfig.db.database, dbConfig.db.username, dbConfig.db.password, {
  host: dbConfig.db.host,
  port: dbConfig.db.port,
  dialect: dbConfig.db.dialect,
});

export const User = sequelize.define('User', {
  // Define your user model here
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

export const Order = sequelize.define('Order', {
  // Define your order model here
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
