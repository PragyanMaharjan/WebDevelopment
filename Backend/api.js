// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './src/database/db.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  db(); // Connect to the database
});
