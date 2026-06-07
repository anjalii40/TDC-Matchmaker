import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import customerRoutes from './routes/customerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '../.env.local' });

const app = express();
const PORT = process.env.PORT || 5050;

// Connect to File Database
connectDB();

// Express Middlewares
app.use(cors());
app.use(express.json());

// Routes Mount points
app.use('/api/customers', customerRoutes);
app.use('/api/customers', matchRoutes);
app.use('/api/customers', noteRoutes);
app.use('/api/auth', authRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", service: "matchmaker-crm-backend" });
});

// Error handling middleware
app.use(errorHandler);

// Listen on Port
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
